var Team = require("../models/teams");

module.exports = {
  index:  index
}

function index(req, res, next) {
  res.render('pages/teams', {
    user:   req.user,
    token:  req.session.trelloOauthToken,
    secret: req.session.trelloOauthSecret
  });
};
