const mongodb = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const User = require('../model/user');


// CONNECTION
const uri = process.env.MONGO_URI
const client = new mongodb.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = client.connect();

// USER
const getUser = async (req, res) => {
    const token = req.headers.cookie.split('token=')[1];
    
    // Decode token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_USERS).findOne({
            _id: new mongodb.ObjectId(decoded.user_id)
        })
        .then(user => {
            let returnUser = {};
            for(const e in req.query) {
                // if(!user[e]) console.log('error');
                returnUser[e] = user[e];
            }
            return returnUser;
        }));
    });
}

//MENUS
const getMenus = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_MENUS).find({}).toArray());
    });
}

// PRODUCTS
const getProducts = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_PRODUCTS).find({}).toArray());
    });
}

const getProduct = async (req, res) => {
    const productId = req.params.productId;

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_PRODUCTS).findOne({
            _id: new mongodb.ObjectId(productId)
        }));
    });
}

const updateProduct = async (req, res) => {
    const product = {
        _id: req.body._id,
        name: req.body.name,
        stock: parseInt(req.body.stock),
        ingredients: req.body.ingredients,
        allergies: req.body.allergies,
        price: parseInt(req.body.price),
    }

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_PRODUCTS).updateOne({
            _id: new mongodb.ObjectId(product._id),
        }, {
            $set: {
                name: product.name,
                stock: product.stock,
                ingredients: product.ingredients,
                allergies: product.allergies,
                price: product.price
            }
        }));
    });
}

const addProduct = async (req, res) => {
    const product = req.body;

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_PRODUCTS).insertOne({
            _id: new mongodb.ObjectId(),
            name: product.name,
            stock: parseInt(product.stock),
            ingredients: product.ingredients,
            allergies: product.allergies,
            price: parseInt(product.price)
        }));
    });
}

const getToppings = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_TOPPINGS).find({}).toArray());
    });
}

const getBreads = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_BREAD).find({}).toArray());
    });
}

const getVegetables = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_VEGETABLES).find({}).toArray());
    });
}

const getSauces = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_SAUCES).find({}).toArray());
    });
}

// PAYMENT
const createPaymentIntent = async (req, res) => {
    const items = req.body.items;

    await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'eur',
            payment_method_types: ['card']
        })
        .then(paymentIntent => {
            res.json({
                clientSecret: paymentIntent.client_secret
            })
        });
}

const calculateOrderAmount = items => {
    let total = 0;

    items.map(item => total += (item.product.price * item.quantity));

    return total;
}

// USER
const register = async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { email, username, password } = req.body;

        // Validate user input
        if (!(email && username && password)) {
            return res.status(400).send('All input is required');
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            username,
            password: encryptedPassword,
            twofa_secret: speakeasy.generateSecret()
        });

        // 2-Factor Authentication
        //qrcode.toDataURL(user.twofa_secret.otpauth_url, (error, data_url) => {
        //     if (error) return res.json({
        //         error: 'server_error'
        //     })
        //     else return res.status(201).json({
        //         email: user.email,
        //         data_url
        //     })
        // })

        // Create token
        const token = createToken(user);

        // save user token
        user.token = token;

        // set token in cookie
        res.cookie('token', token, { httpOnly: true });

        // user
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}

const login = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send('All input is required');
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 2-Factor Authentication
            // qrcode.toDataURL(user.twofa_secret.otpauth_url, (error, data_url) => {
            //     if (error) res.json({
            //         error: 'server_error'
            //     }) 
            //     else res.json({
            //         email,
            //         data_url
            //     });
            // });

            // Create token
            const token = createToken(user);

            // save user token
            user.token = token;

            // set token in cookie
            res.cookie('token', token);

            // user
            return res.status(200).json(user);
        }

        return res.status(400).send('Invalid Credentials');
    } catch (err) {
        console.log(err);
    }
    // Our login logic ends here
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.removeHeader('token')
    res.removeHeader('cookie')

    console.log(req.headers['x-access-token']);
    console.log(req.headers.cookie);
    console.log(req.headers.cookie ? req.headers.cookie.split('token=')[1]:'');
    return res.status(200);
};

const verify2FAToken = async (req, res) => {
    const email = req.body.email;
    const token = req.body.token;

    const user = await User.findOne({ email });

    if (user) {
        const verified = speakeasy.totp.verify({
            secret: user.twofa_secret.base32,
            encoding: 'base32',
            token
        })
    
        if (verified) {
            // Create token
            const token = createToken(user);

            // save user token
            user.token = token;

            // set token in cookie
            res.cookie('token', token, { httpOnly: true });

            // user
            return res.status(200).json(user);
        } else {
            return res.json({
                error: 'token_invalid'
            });
        }
    } else return res.status(400).send('Invalid Credentials');
}

const createToken = user => {
    const { _id, email, type } = user;
    return jwt.sign(
        { user_id: _id, email, type },
        process.env.TOKEN_KEY,
        {
            expiresIn: '2h',
        }
    );
}

// ORDERS
const getOrders = async (req, res) => {
    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_ORDERS).find({}).toArray());
    });
}

const addOrder = async (req, res) => {
    const userId = req.body.userId;
    const order = req.body.order;

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_ORDERS).insertOne({
            _id: new mongodb.ObjectId(),
            userId,
            order,
            progress: 'preparing'
        }));
    });
}

const removeOrder = async (req, res) => {
    const order = req.body;

    connection.then(async _ => {
        res.json(await client.db(process.env.DATABASE).collection(process.env.TABLE_ORDERS).updateOne({
            _id: new mongodb.ObjectId(order._id)
        }, {
            $set: {
                progress: 'done'
            }
        }));

        client.close();
    });
}

// WELCOME
const welcome = async (req, res) => {
    // check role
    if(req.user.type != 'admin') 
        return res.status(403).send('No permission to access this content.')

    res.status(200).send('Welcome 🙌 ');
}

module.exports = {
    getUser,
    logout,

    getMenus,

    getProducts,
    getProduct,
    updateProduct,
    addProduct,

    getToppings,
    getBreads,
    getVegetables,
    getSauces,

    createPaymentIntent,

    getOrders,
    addOrder,
    removeOrder,

    register,
    login,
    verify2FAToken,

    welcome,
}