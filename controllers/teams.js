module.exports = {
  index: index
};

var Team = require('../models/teams');

var teams = function(req, res, next) {
  res.render('teams/index');
};
