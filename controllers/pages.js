
module.exports = {
  login: login,
  dash: dash,
  teamPage: teamPage
};


function login(req, res, next) {
  res.render('pages/welcome');
};

function dash(req, res, next) {
  res.render('pages/dashboard', {
    user:   req.user,
    token:  req.session.trelloOauthToken,
    secret: req.session.trelloOauthSecret
  });
};

function teamPage(req, res, next) {
  res.render('pages/teampage', {
    user:   req.user,
    token:  req.session.trelloOauthToken,
    secret: req.session.trelloOauthSecret
  });
};


