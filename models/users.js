var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  trello_id:          { type: String, required: true },
  trello_username:    { type: String, required: true },
  trello_fullname:    { type: String, required: true },
  teams:       {
                  type: mongoose.Schema.Types.ObjectId,
                  ref:  "Team"
                },
});

var User = mongoose.model('User', userSchema);

module.exports = User;
