'use strict';

/**
 * Module dependencies.
 */
var 	mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		User = mongoose.model('User'),
		_ = require('lodash');
		

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);

/**
 * List of Events
 */
module.exports.list = function(req, res) { 
	User.find().sort('-created').exec(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(user);
		}
	});
};