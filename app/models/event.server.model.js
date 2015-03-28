'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Event name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	friends: [{}
		type: Schema.ObjectId,
		ref: 'User'
	}],
	date: {
		type: Date
	},
	location: {
		type: String,
		default: ''
	}

});

mongoose.model('Event', EventSchema);