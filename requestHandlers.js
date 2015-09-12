//dependencies
var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongooseLookups = require('./mongooseLookups');
var databaseUrl = "ip";
var collections = ["blogs"]
var mongoapp = require('mongojs');
var db = mongoapp(databaseUrl, collections);
var url_query = require('url-query');

//file references
var homeHTML = fs.readFileSync('views/home.html');
var newhomeHTML = fs.readFileSync('views/newhome.html');
var addissueHTML = fs.readFileSync('views/addissue.html');
var submitHTML = fs.readFileSync('views/submit.html');
var templateHTML = fs.readFileSync('views/template.handlebars');

//request handlers
function start(response, postData) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(newhomeHTML);
}

function addissue(response, postData) {
  console.log("Request handler 'postissue' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(addissueHTML);
}

function template(response, postData) {
  console.log("Request handler 'template' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(templateHTML);
}

function submit(response, postData) {
  console.log("Request handler 'submit' was called.");

  var v1 = querystring.parse(postData).title;
  var v2 = querystring.parse(postData).text;
  var v3 = querystring.parse(postData).type;
  var v4 = querystring.parse(postData).scope;

  mongooseLookups.savedb(v1, v2, v3, v4);

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(submitHTML);
}
/*
function call(response){
  console.log("Request handler 'call' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("It's your echo!");
  response.end();
}*/

function view(response, postData){
  console.log("Request handler 'view' was called.");
  var newType = querystring.parse(postData).type;
  localStorage.setItem("viewType", newType)
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(newType, localStorage.getItem("viewType"));
  response.end();
}

function science (response){
  console.log("Request handler 'science' was called.");

  db.blogs.findOne( function(err, found) {
    if( err || !found) console.log("No science found");
    else {
  console.log(found);
  var result = JSON.stringify(found.title);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(result);
}});
}

function sciencelocal (response, postData){
  console.log("Request handler 'sciencelocal' was called.");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Sciencelocal's list!!");
}

function scienceglobal (response, postData){
  console.log("Request handler 'scienceglobal' was called.");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Scienceglobal's list!!");
}
//exports
exports.start = start;
exports.addissue = addissue;
exports.submit = submit;
exports.view = view;
exports.template = template;
exports.science = science;
exports.sciencelocal = sciencelocal;
exports.scienceglobal = scienceglobal;
