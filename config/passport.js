var User = require('../models/users');
var TrelloStrategy = require('passport-trello').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  TrelloStrategy = require('passport-trello').Strategy

  passport.use('trello', new TrelloStrategy({
      consumerKey: process.env.CID,
      consumerSecret: process.env.CLS,
      callbackURL: 'http://localhost:3000/auth/trello/callback',
      passReqToCallback: true,
      trelloParams: {
        scope: "read, write, account",
        name: "Scrumtious",
        expiration: "never"
      }
    }, function (req, token, tokenSecret, profile, done) {
        if (!profile.id) {
          console.log("PROFILE: ", profile, "\n\n\n\n\n\n\n\n")
        } else {
          // Check to see if this user already exists
          // if not,
          // Here is where you save the user into the database, then call done()
          console.log("Success")
          done(null, profile)
        }
    }));
}
