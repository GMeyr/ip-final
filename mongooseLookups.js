var mongoose = require('mongoose');
var Blog = require('./models/blog.js').Blog;



function savedb (title, text, type, scope){
console.log("Now running 'savedb' method");

var current = new Blog({
  title: title,
  text: text,
  type: type,
  scope: scope
});

current.save(function (err) {
  if (err) return handleError(err);
});
}

exports.savedb = savedb;
