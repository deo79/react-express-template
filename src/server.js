'use strict';

var app, 
	bodyParser = require("body-parser"), 
	cookieParser = require("cookie-parser"), 
	debug = require("debug")("react-express-template"), 
	express = require("express"), 
	http = require('http'), 
	logger = require("morgan"), 
	path = require("path"), 
	dist = path.join(__dirname, '/../dist'), 
	enrouten = require('express-enrouten'),
	server;

require("babel/register");

app = express();

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

// load the routes
app.use(enrouten({directory:'./controllers'}));

app.set('models', process.cwd() + '/src/models/');
console.log(app.get('models'));

app.use(cookieParser());

app.use(express["static"](dist));

app.set("port", process.env.PORT || 3000);

app.use(function(req, res, next) {
	var err;
	err = new Error("Not Found");
	err.status = 404;
	return next(err);
});


if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		return res.send({
			message: err.message,
			status: err.status,
			stack: err.stack
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	return res.send({
		message: err.message
	});
});

server = http.createServer(app);

server.listen(app.get("port"), function() {
	return debug("Express server listening on port " + server.address().port);
});
