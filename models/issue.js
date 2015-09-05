//this isn't used for anything.
//It's just me messing around.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  title:  String,
  text:   String,
  type:   String,
  scope:  String,
  user:   String
  });

var Blog = mongoose.model('Blog', blogSchema);

exports.Blog = Blog;
