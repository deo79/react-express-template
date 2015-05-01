'use strict';

module.exports = function(router) {
	router.all('/', function(req, res) {
		res.json({
			here: true
		});
	});
};