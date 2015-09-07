var mongoose = require('mongoose');
var Blog = require('./models/blog.js').Blog;


// Mongoose functions
function savedb (title, text, type, scope){
  console.log("Now running 'savedb' method");
  var current = new Blog({
    title: title, text: text, type: type, scope: scope });
  current.save(function (err) {
  if (err) return handleError(err);
  });}

/*I've tried this function in a seperate environment and I
know it finds things in Mongoose. This seems to be a problem area
though. Maybe I need to convert the results to a different data type
or parse the json or something?*/
function finddb(){
  Blog.find(function (err, blogs) {
  if (err) {return console.errror(err);
  } else {
//    var parsedmongoose = JSON.stringify(blogs);
//    console.log("Now running 'finddb' method", blogs);
//    console.log("JSON parse results: " + parsedmongoose);
  console.log("returned to science handler")
    return blogs;
  }})}

exports.savedb = savedb;
exports.finddb = finddb;
