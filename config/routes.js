var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var teamsController = require('../controllers/teams');

// root path:
router.get('/', pagesController.welcome);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// team resources path
router.get('/teams',   teamsController.index);

module.exports = router;
