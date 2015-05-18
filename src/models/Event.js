'use strict';

var Model = require('app/Model');
// JOINS
var Category = require('./Category.js');

var Event = new Model();

Event.define({
	storage: 'mongodb',
	model: [{
		name: 'eventName',
		label: 'Event name',
		type: 'string',
		default: '',
		validation: {
			rules: [{
				type: 'length[4]',
				prompt: 'Your event name must be at least 4 characters'
			}]
		}
	},
	{
		relatesTo: Category
	}]
});
