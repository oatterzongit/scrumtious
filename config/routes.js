var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');

// root path:
router.get('/', pagesController.welcome);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// teams resource paths:
router.get('/teams', teamsController.index);
// reports resource paths:



module.exports = router;
