import mongoose from 'mongoose';

/**
 * Configuration.
 */

import { clientModel } from './mongo/model/client.js'
import { tokenModel } from './mongo/model/token.js'
import { userModel } from './mongo/model/user.js'

// var clientModel = require('./mongo/model/client'),
// 	tokenModel = require('./mongo/model/token'),
// 	userModel = require('./mongo/model/user');

/**
 * Add example client and user to the database (for debug).
 */

var loadExampleData = function() {

	var client1 = new clientModel({
		id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
		clientId: 'application',
		clientSecret: 'secret',
		grants: [
			'password',
			'refresh_token'
		],
		redirectUris: []
	});

	var client2 = new clientModel({
		clientId: 'confidentialApplication',
		clientSecret: 'topSecret',
		grants: [
			'password',
			'client_credentials'
		],
		redirectUris: []
	});

	var user = new userModel({
		username: 'pedroetb',
		password: 'password',
		type: 'normal',
	});

	client1.save(function(err, client) {

		if (err) {
			return console.error(err);
		}
		console.log('Created client', client);
	});

	user.save(function(err, user) {

		if (err) {
			return console.error(err);
		}
		console.log('Created user', user);
	});

	client2.save(function(err, client) {

		if (err) {
			return console.error(err);
		}
		console.log('Created client', client);
	});
};

/**
 * Dump the database content (for debug).
 */

var dump = function() {

	clientModel.find(function(err, clients) {

		if (err) {
			return console.error(err);
		}
		console.log('clients', clients);
	});

	tokenModel.find(function(err, tokens) {

		if (err) {
			return console.error(err);
		}
		console.log('tokens', tokens);
	});

	userModel.find(function(err, users) {

		if (err) {
			return console.error(err);
		}
		console.log('users', users);
	});
};
// loadExampleData();
// dump()
/*
 * Methods used by all grant types.
 */

const getAccessToken = function(token, callback) {

	tokenModel.findOne({
		accessToken: token
	}).lean().exec((function(callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

const getClient = function(clientId, clientSecret, callback) {

	clientModel.findOne({
		clientId: clientId,
		clientSecret: clientSecret
	}).lean().exec((function(callback, err, client) {

		if (!client) {
			console.error('Client not found1');
		}

		callback(err, client);
	}).bind(null, callback));
};

const saveToken = function(token, client, user, callback) {

	token.client = {
		id: client.clientId
	};

	token.user = {
		username: user.username
	};

	var tokenInstance = new tokenModel(token);
	tokenInstance.save((function(callback, err, token) {

		if (!token) {
			console.error('Token not saved');
		} else {
			token = token.toObject();
			delete token._id;
			delete token.__v;
		}

		callback(err, token);
	}).bind(null, callback));
};

/*
 * Method used only by password grant type.
 */

const getUser = function(username, password, callback) {

	userModel.findOne({
		username: username,
		password: password
	}).lean().exec((function(callback, err, user) {

		if (!user) {
			console.error('User not found');
		}

		callback(err, user);
	}).bind(null, callback));
};

/*
 * Method used only by client_credentials grant type.
 */

const getUserFromClient = function(client, callback) {

	clientModel.findOne({
		clientId: client.clientId,
		clientSecret: client.clientSecret,
		grants: 'client_credentials'
	}).lean().exec((function(callback, err, client) {

		if (!client) {
			console.error('Client not found2');
		}

		callback(err, {
			username: ''
		});
	}).bind(null, callback));
};

/*
 * Methods used only by refresh_token grant type.
 */

const getRefreshToken = function(refreshToken, callback) {

	tokenModel.findOne({
		refreshToken: refreshToken
	}).lean().exec((function(callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

const revokeToken = function(token, callback) {

	tokenModel.deleteOne({
		refreshToken: token.refreshToken
	}).exec((function(callback, err, results) {

		var deleteSuccess = results && results.deletedCount === 1;

		if (!deleteSuccess) {
			console.error('Token not deleted');
		}

		callback(err, deleteSuccess);
	}).bind(null, callback));
};

/**
 * Export model definition object.
 */

export {
	getAccessToken as getAccessToken,
	getClient as getClient,
	saveToken as saveToken,
	getUser as getUser,
	getUserFromClient as getUserFromClient,
	getRefreshToken as getRefreshToken,
	revokeToken as revokeToken
};

// module.exports = {
// 	getAccessToken: getAccessToken,
// 	getClient: getClient,
// 	saveToken: saveToken,
// 	getUser: getUser,
// 	getUserFromClient: getUserFromClient,
// 	getRefreshToken: getRefreshToken,
// 	revokeToken: revokeToken
// };
