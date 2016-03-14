var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var Team = mongoose.model('Team', teamSchema);
var Report = mongoose.model('Report', postSchema);

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
  trello_bid:    { type: String, required: true },
  reports:       [reportSchema]
});

var reportSchema = new mongoose.Schema({
  createdAt:     { type: Date,   default: Date.now },
  current:       { type: String, required: true },
  challenges:    { type: String, required: true },
  outlook:       { type: String, required: true },
  trello_bid:    { type: String, required: true },
  user:          [userSchema], // ref to user
  comments:      [commentSchema]
});

var commentSchema = new mongoose.Schema({
  user:       {
                type: mongoose.Schema.Types.ObjectId,
                ref:  "User"
              },
  body:       { type: String, required: true },
  comments:   [this]

module.exports = Team;
