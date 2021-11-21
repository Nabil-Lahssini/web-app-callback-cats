import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import OAuth2Server from 'oauth2-server';
import { Request, Response } from 'oauth2-server';

import cors from 'cors';
import {
    getProduct,
    getMenus,
    login
    // register,
    // changeEmail,
    // changePassword,
    // verifyUserRegister,
    // verifyUserLogin,
    // getDataUrl,
    // enableTwofa,
    // disableTwofa
} from './functions.js';

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/////////////////////////////
// OAUTH
// https://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/#Step5
// https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
const mongoUri = 'mongodb+srv://admin:fFnqq86Gi4fnsw3V@cluster0.zn4v2.mongodb.net/SoftwareSecurity?retryWrites=true&w=majority';

// Connect mongodb
mongoose.connect(mongoUri, {
	useNewUrlParser: true
}, function(err, res) {
	if(err) 
        return console.error('Error connecting to "%s":', mongoUri, err);

	console.log('Connected successfully to "%s"', mongoUri);
});

app.oauth = new OAuth2Server({
	// model: require('./model.js'),
	model: import('./model.js'),
	accessTokenLifetime: 60 * 60,
	allowBearerTokensInQueryString: true
});

app.all('/oauth/token', obtainToken);
app.get('/', authenticateRequest, function(req, res) {
	res.send('Congratulations, you are in a secret area!');
});

// ??
function obtainToken(req, res) {
	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

// ??
function authenticateRequest(req, res, next) {
	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {

			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

/////////////////////////////

// API Routes
app.get('/api/v1/getMenus', getMenus);
app.post('/api/v1/getProduct', getProduct);
app.post('/api/v1/login', login);
// app.post('/api/v1/register', register);
// app.post('/api/v1/changeEmail', changeEmail);
// app.post('/api/v1/changePassword', changePassword);
// app.post('/api/v1/verifyUserRegister', verifyUserRegister);
// app.post('/api/v1/verifyUserLogin', verifyUserLogin);
// app.post('/api/v1/getDataUrl', getDataUrl);
// app.post('/api/v1/enableTwofa', enableTwofa);
// app.post('/api/v1/disableTwofa', disableTwofa);

// Start API
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});