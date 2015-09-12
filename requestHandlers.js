//dependencies
var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var databaseUrl = "ip";
var collections = ["blogs"];
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

  db.blogs.save({ title: v1, text: v2, type: v3, scope: v4 },
                  function(err, saved){
                    if(err || !saved) console.log("Post not saved");
                    else {
                      console.log("Post saved!");
                    }
                  })


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

function sciencelocal (response){
  console.log("Request handler 'sciencelocal' was called.");

  db.blogs.find({type: "science", scope: "local"}, function(err, slposts) {
    if( err || !slposts) console.log("No science/local issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      console.log("Currently processing this issue: " + currentIssue, typeof currentIssue);
      console.log("Type of currentIssue return: " + typeof currentIssue);
      issuesList = issuesList + currentIssue;
      console.log("So issuesList should now be: " + issuesList)
      console.log("Issue: " + issue.title + "added to issues list");
    } );
      console.log("Finished 'forEach' method");
      console.log("issueList is of type: " + typeof issuesList);
      console.log("issueList is: " + issuesList);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function scienceglobal (response, postData){
  console.log("Request handler 'scienceglobal' was called.");
  db.blogs.find({type: "science", scope: "global"}, function(err, slposts) {
    if( err || !slposts) console.log("No science/global issues found");
    else {
      var issuesList = "";
      console.log("length of slposts: " + slposts.length);
      slposts.forEach( function(issue) {
        var currentIssue = createIssueListHTML(issue);
        issuesList = issuesList + currentIssue;
        console.log("Issue: " + issue.title + "added to issues list");
        }
      );
      console.log("issueList is: " + issuesList);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function createIssueListHTML(issue){
    var thing = "";
    thing += propToElement(issue, "title", "h2");
    thing += propToElement(issue, "text", "p");
    return thing;
}

function propToElement(obj, prop, element){
    return "<" + element + ">" + obj[prop] + "</" + element + ">";
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
