var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var teamSchema = new mongoose.Schema({
  creator:       {
                  type: mongoose.Schema.Types.ObjectId,
                  ref:  "User"
                 },
  members:       {
                  type: mongoose.Schema.Types.ObjectId,
                  ref:  "User"
                 },
  title:         { type: String, required: true },
  trello_bid:    { type: String, required: true }
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;
