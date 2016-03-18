var debug = require("debug")("app:auth");

var User = require("../models/user");
var TrelloStrategy = require("passport-trello").Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, next) {
    debug("--> serializing user:\n", user, "\n\n");
    next(null, user._id);
  });

  passport.deserializeUser(function(id, next) {
    User.findById(id, function(err, user) {
      console.log("USER AUTHENTICATED", user._id, user.fullName)
      debug("--> deserializing user:\n", user, "\n\n");
      next(err, user);
    });
  });

  TrelloStrategy = require("passport-trello").Strategy

  passport.use("trello", new TrelloStrategy({
      consumerKey:       process.env.CID,
      consumerSecret:    process.env.CLS,
      callbackURL:       "/auth/trello/callback",
      passReqToCallback: true,

      trelloParams: {
        scope:      "read, write, account",
        name:       "Scrumtious",
        expiration: "never"
      }
    }, function (req, token, tokenSecret, profile, next) {
        console.log("\nSuccessful login!", "\n");
        debug("  token:  ", token);
        debug("  secret: ", tokenSecret);
        debug("  profile:", profile);

        // Store the retrieved OAuth token(s) with the current session.
        req.session.trelloOauthToken  = token;
        req.session.trelloOauthSecret = tokenSecret;

        // Check the database for a user with the logged in trello id.
        User
        .findOne({trelloId: profile.id}).exec()
        .then(
          function(user) {
            debug("\n\n******SUCCESSFUL SEARCH*********");
            debug("  User: ", user);

            // When there is no user in the database with this trello id,
            // create a new user in the database and move on.
            if (!user) {
              User.create({
                trelloId: profile.id,
                userName: profile._json.username,
                fullName: profile._json.fullName
              })
              .then(
                function(user) { next(null, user); },
                function(err)  { next(err); }
              )

            // Else, when the user is in the database, move on.
            } else {
              next(null, user);
            }
          },
          function(err) { next(err); }
        )
    })
  );
}
