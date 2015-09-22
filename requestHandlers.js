//dependencies
var collections = ["blogs"];
var databaseUrl = "ip";
var db = mongojs(databaseUrl, collections);
var exec = require('child_process').exec;
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var querystring = require('querystring');

//file references
var addissueHTML = fs.readFileSync('views/addissue.html');
var homeHTML = fs.readFileSync('views/home.html');
var issueHTML = fs.readFileSync('views/issue.handlebars');
var listHTML = fs.readFileSync('views/list.handlebars');
var submitHTML = fs.readFileSync('views/submit.html');
var templateHTML = fs.readFileSync('views/template.handlebars');

//request handlers
function addissue(response, postData) {
  console.log("Request handler 'postissue' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(addissueHTML);
}

function id (response, postData, query){
      var param = '' + query.slice(4) + '';
      console.log("now searching mongoDB for _id: " + param);
        db.blogs.findOne({_id: ObjectId(param) }, function(err, slposts) {
        if( err || !slposts) {
      console.log("No issues found");
    } else {
      var result =  JSON.stringify(slposts);
      console.log("found: " + result);

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(result);
      response.end();
        }}
)}


function issue (response, postData, query){
  console.log("Request handler 'issue' was called.");
  console.log("'issue' request handler thinks the query is: " + query);
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(animalHTML);
}

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(newhomeHTML);
}

function submit(response, postData) {
  console.log("Request handler 'submit' was called.");

  var v1 = querystring.parse(postData).title;
  var v2 = querystring.parse(postData).text;
  var v3 = querystring.parse(postData).type;
  var v4 = querystring.parse(postData).scope;
  var v5 = querystring.parse(postData).commside;
  var v6 = querystring.parse(postData).commtype;
  var v7 = querystring.parse(postData).commtext;
  var v8 = querystring.parse(postData).commref;

  if (v5 === "pro" && v7 != ""){
    db.blogs.save({ title: v1, text: v2, type: v3, scope: v4,
                    procomms: [{commissue: v1, commside: v5, commtype: v6, commtext: v7, commref: v8}],
                    comcomms: [] },
                    function(err, saved){
                      if(err || !saved) console.log("Post not saved");
                      else {
                        console.log("Post saved!");
                      }
                    })
  } else if (v5 === "con") {
    db.blogs.save({ title: v1, text: v2, type: v3, scope: v4,
                    procomms: [],
                    comcomms: [{commissue: v1, commside: v5, commtype: v6, commtext: v7, commref: v8}] },
                    function(err, saved){
                      if(err || !saved) console.log("Post not saved");
                      else {
                        console.log("Post saved!");
                      }
                    })
  } else {
    db.blogs.save({ title: v1, text: v2, type: v3, scope: v4,
                    procomms: [],
                    comcomms: [] },
                    function(err, saved){
                      if(err || !saved) console.log("Post not saved");
                      else {
                        console.log("Post saved!");
                      }
                    })
  }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(submitHTML);
}

function template(response, postData) {
  console.log("Request handler 'template' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(templateHTML);
}

//helper functions
function createIssueListHTML(issue){
    var thing = "";
    thing += propToElement(issue, "title", "h2", true);
    thing += propToElement(issue, "text", "p");
    return thing;
}

function propToElement(obj, prop, element, boolean){
    if (arguments.length > 3)
    return "<" + element + " class='issuelink'" + "><a href='/issue/?_id=" + obj._id + "'>"
     + obj[prop] + "</a></" + element + ">";
    else return "<" + element + ">" + obj[prop] + "</" + element + ">";
}

//template views
//science
function sciencelocal (response){
  console.log("Request handler 'sciencelocal' was called.");

  db.blogs.find({type: "science", scope: "local"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}


function scienceregional (response, postData){
  console.log("Request handler 'scienceregional' was called.");

  db.blogs.find({type: "science", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function sciencenational (response){
  console.log("Request handler 'sciencenational' was called.");

  db.blogs.find({type: "science", scope: "national"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function scienceglobal (response){
  console.log("Request handler 'scienceglobal' was called.");

  db.blogs.find({type: "science", scope: "global"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}
//politics
function politicslocal (response){
  console.log("Request handler 'politicslocal' was called.");

  db.blogs.find({type: "politics", scope: "local"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsregional (response){
  console.log("Request handler 'politicsregional' was called.");

  db.blogs.find({type: "politics", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsnational (response){
  console.log("Request handler 'politicsnational' was called.");

  db.blogs.find({type: "politics", scope: "national"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsglobal (response){
  console.log("Request handler 'politicsglobal' was called.");

  db.blogs.find({type: "politics", scope: "global"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}
//life
function lifelocal (response){
  console.log("Request handler 'lifelocal' was called.");

  db.blogs.find({type: "life", scope: "local"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function liferegional (response){
  console.log("Request handler 'liferegional' was called.");

  db.blogs.find({type: "life", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function lifenational (response){
  console.log("Request handler 'lifenational' was called.");

  db.blogs.find({type: "life", scope: "national"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function lifeglobal (response){
  console.log("Request handler 'lifeglobal' was called.");

  db.blogs.find({type: "life", scope: "global"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}
//other
function otherlocal (response){
  console.log("Request handler 'otherlocal' was called.");

  db.blogs.find({type: "other", scope: "local"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function otherregional (response){
  console.log("Request handler 'otherregional' was called.");

  db.blogs.find({type: "other", scope: "regional"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function othernational (response){
  console.log("Request handler 'othernational' was called.");

  db.blogs.find({type: "other", scope: "national"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function otherglobal (response){
  console.log("Request handler 'otherglobal' was called.");

  db.blogs.find({type: "other", scope: "global"}, function(err, slposts) {
    if( err || !slposts) {
      console.log("No issues found");
    } else {
      var issuesList = "";
      slposts.forEach( function(issue) {
      var currentIssue = createIssueListHTML(issue);
      issuesList = issuesList + currentIssue;
    } );
      if (issuesList.length > 1){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(issuesList);
      response.end();
    } else {
      var tooBad = "<p>No issues found. Why not add one yourself?</p>"
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

//exports
exports.start = start;
exports.addissue = addissue;
exports.submit = submit;
exports.template = template;
exports.issue = issue;
exports.id = id;

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
