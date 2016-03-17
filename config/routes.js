var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')
      require('./passport')(passport)


// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var apiController   = require('../controllers/api');
var teamsController = require('../controllers/teams');

// root path:
router.get('/', pagesController.welcome);

// Single Pages Resource paths:
router.get('/dashboard', isLoggedIn, pagesController.dash);

// Teams resource paths:
// router.get('/teams', isLoggedIn, teamsController.index);
router.get('/teams/:id', isLoggedIn, teamsController.show);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// API resources path
router.get('/api/teams',      apiController.index);
router.get('/api/teams/:b_id',  apiController.show);
router.post('/api/teams', apiController.create);


// Passport Route
router.route('/auth/trello')
  .get(passport.authenticate('trello', {scope: ['read', 'write', 'account']}));

router.route('/auth/trello/callback')
  .get(passport.authenticate('trello', {
    successRedirect: '/dashboard',
    failureRedirect: '/failure'
  }));

  router.route('/logout')
    .get(function(req, res){
      req.logout();
      res.redirect('/');
    });

function isLoggedIn(req, res, next) {
  console.log(req.user);

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/trello');
  }
}


module.exports = router;
