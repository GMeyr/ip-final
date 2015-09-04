var mongoose = require('mongoose');

function savedb (title, text, type, scope){

var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  text:   String,
  type:   String,
  scope:  String,
  });

var Blog = mongoose.model('Blog', blogSchema);

var current = new Blog({
  title: title,
  text: text,
  type: type,
  scope: scope
}
);

current.save(function (err) {
  if (err) return handleError(err);
});
}

exports.savedb = savedb;
