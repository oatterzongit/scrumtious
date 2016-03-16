var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')
      require('./passport')(passport)


// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var teamsController = require('../controllers/teams');

// root path:
router.get('/', pagesController.welcome);

// Pages (non-models) Resource paths
router.get('/dashboard', isLoggedIn, pagesController.dash);



// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// team resources path
router.get('/teams',      isLoggedIn, teamsController.index);
router.get('/teams/:id',  isLoggedIn, teamsController.show);
router.post('/teams/new',  isLoggedIn, teamsController.create);

// Report resources paths: ?? Maybe?
// router.get('/teams/:id/report',  teamsController.rIndex);
// router.get('/teams/:id/report/:id',   teamsController.rShow);

// Passport Route
router.route('/auth/trello')
  .get(passport.authenticate('trello', {scope: ['read', 'write', 'account']}));

router.route('/auth/trello/callback')
  .get(passport.authenticate('trello', {
    successRedirect: '/dashboard',
    failureRedirect: '/failure'
  }));

function isLoggedIn(req, res, next) {
  console.log(req.user);

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/trello');
  }
}


module.exports = router;
