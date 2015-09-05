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
handle["/upload/"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/show/"] = requestHandlers.show;
handle["/call"] = requestHandlers.call;
handle["/call/"] = requestHandlers.call;
handle["/addissue"] = requestHandlers.addissue;
handle["/addissue/"] = requestHandlers.addissue;
handle["/submit"] = requestHandlers.submit;
handle["/submit/"] = requestHandlers.submit;
handle["/view"] = requestHandlers.view;
handle["/view/"] = requestHandlers.view;
handle["/template"] = requestHandlers.template;
handle["/template/"] = requestHandlers.template;
handle["/science"] = requestHandlers.science;
handle["/science/"] = requestHandlers.science;


//db.dbstart();

server.start(router.route, handle);
