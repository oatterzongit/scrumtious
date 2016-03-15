var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  trelloId:    { type: String, required: true },
  userName:    { type: String, required: true },
  fullName:    { type: String, required: true },
});

var User = mongoose.model('User', userSchema);

module.exports = User;
