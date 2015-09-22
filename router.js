function route(handle, pathname, response, postData, query) {

    console.log("Router is calling handle for " + pathname + ", " + query);
if (typeof handle[pathname] === 'function'){
      handle[pathname](response, postData, query);
    } else {
      console.log("No request handler found for " + pathname + ", " + query);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found");
      response.end();
    }
}

exports.route = route;
