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
//science
function sciencelocal (response){
  console.log("Request handler 'sciencelocal' was called.");

  db.blogs.find({type: "science", scope: "local"}, function(err, slposts) {
    if( err || !slposts) console.log("No science/local issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
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

function scienceregional (response){
  console.log("Request handler 'scienceregional' was called.");

  db.blogs.find({type: "science", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) console.log("No science/regional issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function sciencenational (response){
  console.log("Request handler 'sciencenational' was called.");

  db.blogs.find({type: "science", scope: "national"}, function(err, slposts) {
    if( err || !slposts) console.log("No science/national issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}
//politics
function politicslocal (response){
  console.log("Request handler 'politicslocal' was called.");

  db.blogs.find({type: "politics", scope: "local"}, function(err, slposts) {
    if( err || !slposts) console.log("No politics/local issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function politicsregional (response){
  console.log("Request handler 'politicsregional' was called.");

  db.blogs.find({type: "politics", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) console.log("No politics/regional issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function politicsnational (response){
  console.log("Request handler 'politicsnational' was called.");

  db.blogs.find({type: "politics", scope: "national"}, function(err, slposts) {
    if( err || !slposts) console.log("No politics/national issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function politicsglobal (response){
  console.log("Request handler 'politicsglobal' was called.");

  db.blogs.find({type: "politics", scope: "global"}, function(err, slposts) {
    if( err || !slposts) console.log("No politics/global issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}
//life
function lifelocal (response){
  console.log("Request handler 'lifelocal' was called.");

  db.blogs.find({type: "life", scope: "local"}, function(err, slposts) {
    if( err || !slposts) console.log("No life/local issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function liferegional (response){
  console.log("Request handler 'liferegional' was called.");

  db.blogs.find({type: "life", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No life/regional issues found");
      var tooBad = "<p>No issues found. Why not ask about one of your own?</p>"
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(tooBad);
      response.end();
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function lifeglobal (response){
  console.log("Request handler 'lifeglobal' was called.");

  db.blogs.find({type: "life", scope: "global"}, function(err, slposts) {
    if( err || !slposts) console.log("No life/global issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function lifenational (response){
  console.log("Request handler 'lifenational' was called.");

  db.blogs.find({type: "life", scope: "national"}, function(err, slposts) {
    if( err || !slposts) console.log("No life/national issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}
//other
function otherlocal (response){
  console.log("Request handler 'otherlocal' was called.");

  db.blogs.find({type: "other", scope: "local"}, function(err, slposts) {
    if( err || !slposts) console.log("No other/local issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function otherregional (response){
  console.log("Request handler 'otherregional' was called.");

  db.blogs.find({type: "other", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) console.log("No other/regional issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function othernational (response){
  console.log("Request handler 'othernational' was called.");

  db.blogs.find({type: "other", scope: "national"}, function(err, slposts) {
    if( err || !slposts) console.log("No other/national issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    }
  });
}

function otherglobal (response){
  console.log("Request handler 'otherglobal' was called.");

  db.blogs.find({type: "other", scope: "global"}, function(err, slposts) {
    if( err || !slposts) console.log("No other/global issues found");
    else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
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
exports.scienceregional = scienceregional;
exports.sciencenational = sciencenational;
exports.scienceglobal = scienceglobal;
exports.politicslocal = politicslocal;
exports.politicsregional = politicsregional;
exports.politicsnational = politicsregional;
exports.politicsglobal = politicsglobal;
exports.lifelocal = lifelocal;
exports.liferegional = liferegional;
exports.lifenational = lifenational;
exports.lifeglobal = lifeglobal;
exports.otherlocal = otherlocal;
exports.otherregional = otherregional;
exports.othernational = othernational;
exports.otherglobal = otherglobal;
