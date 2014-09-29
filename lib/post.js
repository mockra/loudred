var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  url: String,
  title: String,
  name: String
});

module.exports = mongoose.model('Post', postSchema);
