require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const functions = require('./config/functions')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV == "development" ? "http://localhost:3000" : process.env.WEBSITE_URL,
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'); // 2 years
    next();
});

const auth = require('./middleware/auth');

// Routes
app.get('/api/v1/menus', auth, functions.getMenus);

app.get('/api/v1/products', auth, functions.getProducts);
app.get('/api/v1/products/:productId', auth, functions.getProduct);
app.post('/api/v1/products/edit', auth, functions.updateProduct);
app.post('/api/v1/products/add', auth, functions.addProduct);

app.post('/api/v1/createPaymentIntent', auth, functions.createPaymentIntent);

app.get('/api/v1/orders', auth, functions.getOrders);
app.post('/api/v1/addOrder', auth, functions.addOrder);
app.post('/api/v1/removeOrder', auth, functions.removeOrder);

app.post('/api/v1/register', functions.register);
app.post('/api/v1/login', functions.login);
app.post('/api/v1/verify', functions.verify2FAToken);

app.post('/api/v1/welcome', auth, functions.welcome);

module.exports = app;