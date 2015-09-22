var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");



var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/start/"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/upload/"] = requestHandlers.upload;
handle["/addissue"] = requestHandlers.addissue;
handle["/addissue/"] = requestHandlers.addissue;
handle["/submit"] = requestHandlers.submit;
handle["/submit/"] = requestHandlers.submit;
handle["/template"] = requestHandlers.template;
handle["/template/"] = requestHandlers.template;
handle["/issue"] = requestHandlers.issue;
handle["/issue/"] = requestHandlers.issue;
handle["/id"] = requestHandlers.id;
handle["/id/"] = requestHandlers.id;
handle["/comment"] = requestHandlers.comment;
handle["/comment/"] = requestHandlers.comment;


handle["/sciencelocal"] = requestHandlers.sciencelocal;
handle["/sciencelocal/"] = requestHandlers.sciencelocal;
handle["/scienceregional"] = requestHandlers.scienceregional;
handle["/scienceregional/"] = requestHandlers.scienceregional;
handle["/sciencenational"] = requestHandlers.sciencenational;
handle["/sciencenational/"] = requestHandlers.sciencenational;
handle["/scienceglobal"] = requestHandlers.scienceglobal;
handle["/scienceglobal/"] = requestHandlers.scienceglobal;
handle["/politicslocal"] = requestHandlers.politicslocal;
handle["/politicslocal/"] = requestHandlers.politicslocal;
handle["/politicsregional"] = requestHandlers.politicsregional;
handle["/politicsregional/"] = requestHandlers.politicsregional;
handle["/politicsnational"] = requestHandlers.politicsnational;
handle["/politicsnational/"] = requestHandlers.politicsnational;
handle["/politicsglobal"] = requestHandlers.politicsglobal;
handle["/politicsglobal/"] = requestHandlers.politicsglobal;
handle["/lifelocal"] = requestHandlers.lifelocal;
handle["/lifelocal/"] = requestHandlers.lifelocal;
handle["/liferegional"] = requestHandlers.liferegional;
handle["/liferegional/"] = requestHandlers.liferegional;
handle["/lifenational"] = requestHandlers.lifenational;
handle["/lifenational/"] = requestHandlers.lifenational;
handle["/lifeglobal"] = requestHandlers.lifeglobal;
handle["/lifeglobal/"] = requestHandlers.lifeglobal;
handle["/otherlocal"] = requestHandlers.otherlocal;
handle["/otherlocal/"] = requestHandlers.otherlocal;
handle["/otherregional"] = requestHandlers.otherregional;
handle["/otherregional/"] = requestHandlers.otherregional;
handle["/othernational"] = requestHandlers.othernational;
handle["/othernational/"] = requestHandlers.othernational;
handle["/otherglobal"] = requestHandlers.otherglobal;
handle["/otherglobal/"] = requestHandlers.otherglobal;


server.start(router.route, handle);
