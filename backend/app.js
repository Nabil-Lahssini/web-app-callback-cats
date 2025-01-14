require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const functions = require('./config/functions')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV.trim() == "development" ? "http://localhost:3000" : process.env.WEBSITE_URL,
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'); // 2 years
    next();
});
app.use(cookieParser());

const auth = require('./middleware/auth');

// Routes
app.get('/api/v1/me', auth, functions.getUser);
app.post('/api/v1/logout', auth, functions.logout);

app.get('/api/v1/menus', auth, functions.getMenus);

app.get('/api/v1/products', auth, functions.getProducts);
app.get('/api/v1/products/:productId', auth, functions.getProduct);
app.post('/api/v1/products/edit', auth, functions.updateProduct);
app.post('/api/v1/products/add', auth, functions.addProduct);

app.get('/api/v1/toppings', auth, functions.getToppings);
app.get('/api/v1/breads', auth, functions.getBreads);
app.get('/api/v1/vegetables', auth, functions.getVegetables);
app.get('/api/v1/sauces', auth, functions.getSauces);

app.post('/api/v1/createPaymentIntent', auth, functions.createPaymentIntent);

app.get('/api/v1/orders', auth, functions.getOrders);
app.post('/api/v1/addOrder', auth, functions.addOrder);
app.post('/api/v1/removeOrder', auth, functions.removeOrder);

app.post('/api/v1/register', functions.register);
app.post('/api/v1/login', functions.login);
app.post('/api/v1/verify', functions.verify2FAToken);

app.post('/api/v1/welcome', auth, functions.welcome);

module.exports = app;