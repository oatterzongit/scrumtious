var express = require('express'),
    router  = new express.Router();


// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var teamsController = require('../controllers/teams');


// root path:
router.get('/', pagesController.login);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// team resources path
router.get('/teams',      teamsController.index);
router.get('/teams/:id',  teamsController.show);
router.post('/teams/new',  teamsController.create);

// Team/report resources paths:
router.get('/teams/:id/report',  teamsController.rIndex);
router.get('/teams/:id/report/:id',   teamsController.rShow);


module.exports = router;
