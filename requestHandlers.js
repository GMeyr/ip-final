//dependencies
var collections = ["blogs"];
var collectionsI = ["issues"];
var collectionsC = ["comments"];
var commentSort = require('./commentSorter.js').commentSort;
var databaseUrl = "ip";
var mongojs = require('mongojs');
var db_url = "mongodb://heroku_sbd3mh64:vdm6uokhosiefj5ndkuek9tho0@ds037234.mongolab.com:37234/heroku_sbd3mh64";
var db = mongojs.connect("mongodb://heroku_sbd3mh64:vdm6uokhosiefj5ndkuek9tho0@ds037234.mongolab.com:37234/heroku_sbd3mh64", ['collectionsI']);
//var db = mongojs("mongodb://heroku_sbd3mh64:vdm6uokhosiefj5ndkuek9tho0@ds037234.mongolab.com:37234/heroku_sbd3mh64", ['collectionsI']);
//var db = mongojs(databaseUrl, collections);
var dbi = mongojs.connect(db_url, collectionsI);
//var dbi = mongojs(db_url, collectionsI);
var dbc = mongojs.connect(db_url, collectionsC);
//var dbc = mongojs(db_url, collectionsC);

db.on('error', function(err) {
    console.log('Catch ', err);
});
dbi.on('error', function(err) {
    console.log('Catch ', err);
});
dbc.on('error', function(err) {
    console.log('Catch ', err);
});



var exec = require('child_process').exec;
var fs = require('fs');
var ObjectId = mongojs.ObjectId;
var querystring = require('querystring');

var mongo = require('mongodb');
var db_name = "nodejs";
/*var mongodb_connection_string = 'mongodb://heroku_sbd3mh64:vdm6uokhosiefj5ndkuek9tho0@ds037234.mongolab.com:37234/heroku_sbd3mh64/' + "ip";
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
*/

//file references
var addissueHTML = fs.readFileSync('views/addissue.html');
var homeHTML = fs.readFileSync('views/home.html');
var issueHTML = fs.readFileSync('views/issue.html');
var submitHTML = fs.readFileSync('views/submit.html');
var templateHTML = fs.readFileSync('views/template.html');

//request handlers
function addissue(response, postData) {
  console.log("Handling /addissue/");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(addissueHTML);
}

function addtypevote (response, postData, query) {
  console.log("Handling /addtypevote/");

  var ampIndex = query.indexOf("&");
  var vote_comm_id =  query.slice(4, ampIndex);
  var vote_comm_type = query.slice(ampIndex + 6);
  console.log("--vote_comm_id: " + vote_comm_id + "  and vote_comm_type: " + vote_comm_type);

  switch (vote_comm_type) {
    case 'statistical':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No issues found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many statvotes: " + doc['statvotes']);//switch statvotes on this and the next line to dot notation?
          var newvotes = doc['statvotes'] + 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {statvotes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--statvotes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--statvotes updated");
          });
        }
      });
      break;

    case 'rational':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No issues found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many ratvotes: " + doc['ratvotes']);//switch statvotes on this and the next line to dot notation?
          var newvotes = doc['ratvotes'] + 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {ratvotes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--ratvotes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--ratvotes updated");
          });
        }
      });
      break;

    case 'moral':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No issues found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many moralvotes: " + doc['moralvotes']);//switch moralvotes on this and the next line to dot notation?
          var newvotes = doc['moralvotes'] + 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {moralvotes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--moralvotes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--moralvotes updated");
          });
        }
      });
      break;

    case 'anecdotal':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No issues found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many anecvotes: " + doc['anecvotes']);//switch anecvotes on this and the next line to dot notation?
          var newvotes = doc['anecvotes'] + 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {anecvotes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--anecvotes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--anecvotes updated");
          });
        }
      });
      break;

    default:
      console.log("--did not find vote_comm_type", vote_comm_type, typeof vote_comm_type);
    }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(
    "<!--header-->" +
    "<h1 class='logo'>issueprism</h1>" +
    '<div class="navbar">' +
    '<p><a href="/">Home</a> &nbsp; <a href="/addissue">Add Issue</a></p>' +
    '</div>' +
    '<!--content-->' +
    "<p>Vote sumbmitted!</p>");
}

function addvote (response, postData, query) {
  console.log("Handling /addvote/");

  var ampIndex = query.indexOf("&");
  var vote_comm_id =  query.slice(4, ampIndex);
  var vote_comm_type = query.slice(ampIndex + 6);
  console.log("--vote_comm_id: " + vote_comm_id + "  and vote_comm_type: " + vote_comm_type);

  switch (vote_comm_type) {
    case 'up':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No comments found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many votes: " + doc['votes']);//switch statvotes on this and the next line to dot notation?
          var newvotes = doc['votes'] + 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {votes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--votes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--votes updated");
          });
        }
      });
      break;

    case 'down':

      dbc.comments.findOne({_id: ObjectId(vote_comm_id) }, function(err, doc) {
        if( err || !doc) {
          console.log("No comments found");
        } else {
          var stringresult =  JSON.stringify(doc);
          console.log("--found, and has this many votes: " + doc['votes']);//switch statvotes on this and the next line to dot notation?
          var newvotes = doc['votes'] - 1;

          dbc.comments.update({_id: ObjectId(vote_comm_id) }, {$set: {votes: newvotes}}, function(err, updated) {
            if( err || !updated ) {
              console.log("--votes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>vote failed!</p>");
            } else console.log("--votes updated");
          });
        }
      });
      break;

    default:
      console.log("--did not find vote_comm_type", vote_comm_type, typeof vote_comm_type);
    }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(
    "<!--header-->" +
    "<h1 class='logo'>issueprism</h1>" +
    '<div class="navbar">' +
    '<p><a href="/">Home</a> &nbsp; <a href="/addissue">Add Issue</a></p>' +
    '</div>' +
    '<!--content-->' +
    "<p>Vote sumbmitted!</p>");
}



function comment(response, postData, query) {
  console.log("Handling /comment/");

  var postCommIssue_Id = querystring.parse(postData).commissue_id;
  var postCommSide = querystring.parse(postData).commside;
  var postCommType = querystring.parse(postData).commtype;
  console.log("--When recieved, postCommIssue_Id was: " + postCommIssue_Id)
  var postCommText = querystring.parse(postData).commtext;
  var postCommRef = querystring.parse(postData).commref;

  var generated__comment_id = new ObjectId();

  var newslug = randomInt(100, 10000);
  console.log("--generated__comment_id: " + generated__comment_id, "newslug: " + newslug, "postCommIssue_Id: " + postCommIssue_Id);

  dbc.comments.save({_id: generated__comment_id, issue_id: postCommIssue_Id, slug: newslug, posted: new Date(),
                    side: postCommSide, type: postCommType, text: postCommText, ref: postCommRef,
                    statvotes: 0, ratvotes: 0, moralvotes: 0, anecvotes: 0, badvotes: 0, votes: 0, none: 0 },
                    function(err, saved){
                      if(err || !saved) console.log("--comment not saved");
                      else {
                        console.log("--comment saved!");
                      }
                    });

    switch (postCommType) {
      case 'statistical':
        dbc.comments.update({_id: generated__comment_id}, {$set: {statvotes: 3}}, function(err, updated) {
          if( err || !updated ) {
              console.log("--statvotes not updated");
              response.writeHead(200, {"Content-Type": "text/html"});
              response.end("<p>Comment submission failed!</p>");
          } else console.log("--statvotes updated");
        });
      break;
            case 'rational':
        dbc.comments.update({_id: generated__comment_id}, {$set: {ratvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--ratvotes not updated");
          else console.log("--ratvotes updated");
        });
      break;
            case 'moral':
        dbc.comments.update({_id: generated__comment_id}, {$set: {moralvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--moralvotes not updated");
          else console.log("--moralvotes updated");
        });
      break;
            case 'anecdotal':
        dbc.comments.update({_id: generated__comment_id}, {$set: {anecvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--anecvotes not updated");
          else console.log("--anecvotes updated");
        });
      break;
    default:
      console.log("--did not find postCommType", postCommType, typeof postCommType);
    }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(
    "<!--header-->" +
    "<h1 class='logo'>issueprism</h1>" +
    '<div class="navbar">' +
    '<p><a href="/">Home</a> &nbsp; <a href="/addissue">Add Issue</a></p>' +
    '</div>' +
    '<!--content-->' +
    "<p>Comment sumbmitted!</p>");
}

function id (response, postData, query){
      var param = '' + query.slice(4) + '';
      console.log("Handling /id/ and searching mongoDB for _id: " + param);
        dbi.issues.findOne({_id: ObjectId(param) }, function(err, doc) {
        if( err || !doc) {
      console.log("No issues found");
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<p>No issues found.</p>");
      response.end();
    } else {
      var result =  JSON.stringify(doc);
      console.log("--found: " + result);

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(result);
      response.end();
        }}
);}

function issue (response, postData, query){
  console.log("Handling /issue/ with query " + query);
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(issueHTML );
}

function getcomments (response, postData, query){
  console.log('Handling /getcomments/ with query ' + query);
  var andIndex = query.indexOf("&"),
      query_id = query.slice(4, andIndex),
      query_side = query.slice(andIndex + 6);

  console.log('--breaking query into _id: ' + query_id + " and side: " + query_side);
  dbc.comments.find({issue_id: "" + query_id, side: query_side}, function(err, comms) {
  if( err || !comms) {
    console.log("No comments found");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<p>Failed to find comments</p>");
  } else {
    var result = JSON.stringify(commentSort(comms));
    console.log("--responding with " + result.length + " " + query_side + " comments");
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(result);
    response.end();
  }
  }

);}

function start(response, postData) {
  console.log("Handling /start/");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(homeHTML);
}

function submit(response, postData) {
  console.log("Handling /submit/");

  var postTitle = querystring.parse(postData).title;
  var postText = querystring.parse(postData).text;
  var postType = querystring.parse(postData).type;
  var postScope = querystring.parse(postData).scope;
  var postCommSide = querystring.parse(postData).commside;
  var postCommType = querystring.parse(postData).commtype;
  var postCommText = querystring.parse(postData).commtext;
  var postCommRef = querystring.parse(postData).commref;

  var generated_issue_id = new ObjectId();
  var generated__comment_id = new ObjectId();
  db.issues.save({ _id: generated_issue_id, title: postTitle, text: postText, type: postType, scope: postScope},
                  function(err, saved){
                    if(err || !saved) console.log("--Post not saved");
                    else {
                      console.log("--Post saved!");
                    }
                  });
  if (postCommSide === "pro" || "con"){
  //find comment just saved to retrieve _id
    newslug = randomInt(100, 10000);
    dbc.comments.save({_id: generated__comment_id, issue_id: generated_issue_id, slug: newslug, posted: new Date(),
                      side: postCommSide, type: postCommType, text: postCommText, ref: postCommRef,
                      statvotes: 0, ratvotes: 0, moralvotes: 0, anecvotes: 0, badvotes: 0, votes: 0, none: 0 },
                    function(err, saved){
                      if(err || !saved) console.log("--comment not saved");
                      else {
                        console.log("--comment saved!");
                      }
                    });

    switch (postCommType) {
      case 'statistical':
        dbc.comments.update({_id: generated__comment_id}, {$set: {statvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--statvotes not updated");
          else console.log("--statvotes updated");
        });
      break;
            case 'rational':
        dbc.comments.update({_id: generated__comment_id}, {$set: {ratvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--ratvotes not updated");
          else console.log("--ratvotes updated");
        });
      break;
            case 'moral':
        dbc.comments.update({_id: generated__comment_id}, {$set: {moralvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--moralvotes not updated");
          else console.log("--moralvotes updated");
        });
      break;
            case 'anecdotal':
        dbc.comments.update({_id: generated__comment_id}, {$set: {anecvotes: 3}}, function(err, updated) {
          if( err || !updated ) console.log("--anecvotes not updated");
          else console.log("--anecvotes updated");
        });
      break;
    default:
      console.log("--did not find postCommType", postCommType, typeof postCommType);
    }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.end();
  }}

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
    return "<" + element + " class='issuelink'" + "><a href='/issue/?_id=" + obj._id + "'>" + obj[prop] + "</a></" + element + ">";
    else return "<" + element + ">" + obj[prop] + "</" + element + ">";
}


function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}







//Template Views
//science
function sciencelocal (response){
  console.log("Request handler 'sciencelocal' was called.");

  dbi.issues.find({type: "science", scope: "local"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}


function scienceregional (response, postData){
  console.log("Request handler 'scienceregional' was called.");

  dbi.issues.find({type: "science", scope: "regional"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function sciencenational (response){
  console.log("Request handler 'sciencenational' was called.");

  dbi.issues.find({type: "science", scope: "national"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function scienceglobal (response){
  console.log("Request handler 'scienceglobal' was called.");

  dbi.issues.find({type: "science", scope: "global"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
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

  dbi.issues.find({type: "politics", scope: "local"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsregional (response){
  console.log("Request handler 'politicsregional' was called.");

  dbi.issues.find({type: "politics", scope: "regional"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsnational (response){
  console.log("Request handler 'politicsnational' was called.");

  dbi.issues.find({type: "politics", scope: "national"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function politicsglobal (response){
  console.log("Request handler 'politicsglobal' was called.");

  dbi.issues.find({type: "politics", scope: "global"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
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

  dbi.issues.find({type: "life", scope: "local"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function liferegional (response){
  console.log("Request handler 'liferegional' was called.");

  dbi.issues.find({type: "life", scope: "regional"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function lifenational (response){
  console.log("Request handler 'lifenational' was called.");

  dbi.issues.find({type: "life", scope: "national"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function lifeglobal (response){
  console.log("Request handler 'lifeglobal' was called.");

  dbi.issues.find({type: "life", scope: "global"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
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

  dbi.issues.find({type: "other", scope: "local"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function otherregional (response){
  console.log("Request handler 'otherregional' was called.");

  dbi.issues.find({type: "other", scope: "regional"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function othernational (response){
  console.log("Request handler 'othernational' was called.");

  dbi.issues.find({type: "other", scope: "national"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

function otherglobal (response){
  console.log("Request handler 'otherglobal' was called.");

  dbi.issues.find({type: "other", scope: "global"}, function(err, slposts) {
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
      var tooBad = "<p>No issues found. Why not add one yourself?</p>";
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(tooBad);
      response.end();
    }
    }
  });
}

//exports

exports.addissue = addissue;
exports.comment = comment;
exports.id = id;
exports.issue = issue;
exports.getcomments = getcomments;
exports.start = start;
exports.submit = submit;
exports.template = template;
exports.addtypevote = addtypevote;
exports.addvote = addvote;

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
