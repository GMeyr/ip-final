var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongooseLookups = require('./mongooseLookups');


var homeHTML = fs.readFileSync('views/home.html');
var addissueHTML = fs.readFileSync('views/addissue.html');
var submitHTML = fs.readFileSync('views/submit.html');


function start(response, postData) {
  console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(homeHTML);
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
}

function addissue(response, postData) {
  console.log("Request handler 'postissue' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(addissueHTML);
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

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "image/gif"});
  fs.createReadStream("images/test.gif").pipe(response);
}

function data(response) {
  console.log("Request handler 'data' was called.");
  console.log("CONGRATULATIONS! You're making http requests.");
  MongoClient.connect(
    'mongodb://127.0.0.1:27017/desk',
    function(err, connection) {
      var collection = connection.collection('desk');

      collection.find().toArray(function(err, documents) {
          console.dir(documents);
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(documents);
          connection.close();
        }

 ) });


  fs.createReadStream("images/test.gif").pipe(response);
}

function call(response){
  console.log("Request handler 'call' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("It's your echo!");
  response.end();
}



exports.start = start;
exports.upload = upload;
exports.show = show;
exports.data = data;
exports.call = call;
exports.addissue = addissue;
exports.submit = submit;
