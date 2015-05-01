'use strict';

module.exports = function(router) {
	router.post('/', function(req, res, next) {
		var UserModel = require(req.app.get('models') + 'User');
		UserModel.load(req.body);
		console.log('data', UserModel.data);
		UserModel.validate(function(result) {
			res.json({
				token: '34634634634634',
				valid: result.valid,
				messages: result.messages
			});
		});
	});
};
