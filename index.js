var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/ip');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/start/"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/data"] = requestHandlers.data;
handle["/call"] = requestHandlers.call;
handle["/addissue"] = requestHandlers.addissue;
handle["/submit"] = requestHandlers.submit;

//db.dbstart();

server.start(router.route, handle);
