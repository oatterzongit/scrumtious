
module.exports = {
  login: login
};

var login = function(req, res, next) {
  res.render('pages/login');
};
