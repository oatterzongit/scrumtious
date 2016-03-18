var Team = require("../models/team");

module.exports = {
  show: show
}


function show(req, res, next) {
  Team.findById(req.params.id, function(err, team) {
    if (err) res.send(err);
    res.render('pages/teams', {
      user:   req.user,
      token:  req.session.trelloOauthToken,
      secret: req.session.trelloOauthSecret,
      team: team
    })
  })
}
