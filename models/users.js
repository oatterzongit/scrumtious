var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  first_name:   { type: String, required: true },
  last_name:    { type: String, required: true },
  trello_id:    { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
