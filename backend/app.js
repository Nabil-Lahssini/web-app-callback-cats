require('dotenv').config();
require("./config/database").connect();
const express = require('express');
const functions = require('./config/functions')
const cors = require("cors");

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}));
app.use(express.json());

const auth = require("./middleware/auth");

// Routes
app.get('/api/v1/getMenus', auth, functions.getMenus);
app.get('/api/v1/getProduct/:productId?', auth, functions.getProduct);
app.post('/api/v1/createPaymentIntent', auth, functions.createPaymentIntent);
app.post("/api/v1/register", functions.register);
app.post("/api/v1/login", functions.login);
app.post("/api/v1/verify", functions.verify2FAToken);
app.post("/api/v1/welcome", auth, functions.welcome);

module.exports = app;