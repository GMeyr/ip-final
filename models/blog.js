//schema used by mongooseLookups.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  text:   String,
  type:   String,
  scope:  String,
  });

var Blog = mongoose.model('Blog', blogSchema);

exports.Blog = Blog;
