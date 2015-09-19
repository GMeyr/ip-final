var http = require("http");
var url  = require('url');


function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    console.log("Request for" + pathname + " recieved.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Recieved POST data chunk " + postDataChunk + ".");
    });

    request.addListener("end", function() {
      var pathname = url.parse(request.url).pathname;
      var query = url.parse(request.url).query;
      route(handle, pathname, response, postData, query);
    })
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server started on port 8888.")
}


exports.start = start;
