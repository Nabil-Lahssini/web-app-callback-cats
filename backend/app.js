require('dotenv').config();
require("./config/database").connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const functions = require('./config/functions')

const app = express();

app.use(express.json());

// Logic goes here
// importing user context
const User = require("./model/user");

// Create token
const createToken = (user) => {
    const { _id, email, type } = user;
    return jwt.sign(
        { user_id: _id, email, type },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
}

// Register
app.post("/register", async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { email, username, password } = req.body;

        // Validate user input
        if (!(email && username && password)) {
            return res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            username,
            password: encryptedPassword,
        });

        // Create token
        const token = createToken(user);

        // save user token
        user.token = token;

        // set token in cookie
        res.cookie('token', token, { httpOnly: true });

        // return new user
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

// Login
app.post("/login", async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = createToken(user);

            // save user token
            user.token = token;

            // set token in cookie
            res.cookie('token', token, { httpOnly: true });

            // user
            return res.status(200).json(user);
        }

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our login logic ends here
});

const auth = require("./middleware/auth");

// Example
app.post("/welcome", auth, (req, res) => {
    // check role
    if(req.user.type != "admin") 
        return res.status(403).send("No permission to access this content.")

    res.status(200).send("Welcome 🙌 ");
});

// Routes
app.get('/api/v1/getMenus', auth, functions.getMenus);
app.post('/api/v1/getProduct', auth, functions.getProduct);
app.post('/api/v1/login', auth, functions.login);

module.exports = app;