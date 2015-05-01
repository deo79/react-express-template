'use strict';

module.exports = function(router) {
	router.get('/setup/:model', function(req, res, next) {
		var Model = require(req.app.get('models') + req.params.model);
		res.json(Model.clientValidationRules());
	});
};
