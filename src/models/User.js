'use strict';

var Model = require('app/Model');

var User = new Model();

User.define({
	storage: 'mongodb',
	model: [{
		name: 'username',
		type: 'string',
		validation: {
			rules: [{
				type: 'length[4]',
				prompt: 'Your username must be at least 4 characters long.'
			}],
			async: function(val, cb) {
				var output = {
					valid: true,
					message: ''
				};
				if (!val) {
					output.valid = false;
					output.message = 'Please provide a username';
				}
				if (val === '123123') {
					output.valid = false;
					output.message = 'That username is already in use.';
				}
				cb(null, output);
			}
		}
	}, {
		name: 'password',
		type: 'string',
		validation: {
			rules: [{
				type: 'length[6]',
				prompt: 'Your password must be at least 6 characters long.'
			}],
			async: function(val, cb) {
				val = User.safeToString(val);
				var output = {
					valid: true,
					message: ''
				};
				if (val.length < 5) {
					output.valid = false;
					output.message = 'Please provide at least a 5 character password';
				}
				cb(null, output);
			}
		}
	}]
});

module.exports = User;
