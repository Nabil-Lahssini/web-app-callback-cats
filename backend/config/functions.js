const mongodb = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uri = process.env.MONGO_URI
const client = new mongodb.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = require("../model/user");

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

const getMenus = async (req, res) => {
    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_MENUS).find({}).toArray());

        client.close();
    })
}

const getProduct = async (req, res) => {
    const productId = req.params.productId;
    console.log(process.env.TABLE_PRODUCTS)

    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_PRODUCTS).findOne({
            _id: new mongodb.ObjectId(productId)
        }));

        client.close();
    })
}

const calculateOrderAmount = items => {
    let total = 0;

    items.map(item => total += (item.product.price * item.quantity));

    return total;
}

const createPaymentIntent = async (req, res) => {
    const items = req.body.items;

    await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "eur",
            payment_method_types: ["card"]
        })
        .then(paymentIntent => {
            res.json({
                clientSecret: paymentIntent.client_secret
            })
        });
}

const login = async (req, res) => {
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
}

const register = async (req, res) => {
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
}

const welcome = async (req, res) => {
    // check role
    if(req.user.type != "admin") 
        return res.status(403).send("No permission to access this content.")

    res.status(200).send("Welcome 🙌 ");
}

module.exports = {
    getMenus,
    getProduct,
    createPaymentIntent,
    login,
    register,
    welcome
}