require('dotenv').config();
require("./config/database").connect();
const express = require('express');
const functions = require('./config/functions')
const cors = require("cors");

const app = express();

app.use(cors({
    origin:'https://eateecats.be',
    credentials:true,
    optionSuccessStatus:200
}));
app.use(express.json());

const auth = require("./middleware/auth");

// Routes
app.get('/api/v1/menus', auth, functions.getMenus);
app.get('/api/v1/products', auth, functions.products);
app.get('/api/v1/product/:productId?', auth, functions.getProduct);
app.post('/api/v1/createPaymentIntent', auth, functions.createPaymentIntent);
app.post("/api/v1/register", functions.register);
app.post("/api/v1/login", functions.login);
app.post("/api/v1/verify", functions.verify2FAToken);
app.post("/api/v1/welcome", auth, functions.welcome);
app.get("/api/v1/orders", auth, functions.getOrders);
app.post("/api/v1/addOrder", auth, functions.addOrder);
app.post("/api/v1/removeOrder", auth, functions.removeOrder);

module.exports = app;