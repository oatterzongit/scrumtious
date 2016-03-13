var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var postSchema = new mongoose.Schema({
  createdAt:     { type: Date,   default: Date.now },
  current:       { type: String, required: true },
  challenges:    { type: String, required: true },
  outlook:       { type: String, required: true },
  trello_board:  { type: String, required: true },
  user:          [userSchema], // ref to user
  comments:      [commentSchema]
});

var Post = mongoose.model('Post', postSchema);

var commentSchema = new mongoose.Schema({
  user:       {
                type: mongoose.Schema.Types.ObjectId,
                ref:  "User"
              },
  body:       { type: String, required: true },
  comments:   [this]

module.exports = Post;
