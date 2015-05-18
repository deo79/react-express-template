'use strict';

var Model = require('app/Model');

var Category = new Model();

Category.define({
	storage: 'mongodb',
	model: [{
		name: 'categoryName',
		type: 'string',
		validation: {
			rules: [{
				type: 'length[2]',
				prompt: 'Your category name must be at least 2 characters'
			}]
		}
	},
	{
		name: 'isActive',
		type: 'boolean',
		default: false
	}]
});