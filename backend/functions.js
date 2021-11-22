import {
    MongoClient,
    ObjectId
} from "mongodb";
import {
    Stripe
} from "stripe";
// import {
//     randomBytes,
//     scrypt
// } from "crypto";
// import speakeasy from "speakeasy";
// import {
//     toDataURL
// } from "qrcode";

const DATABASE = "SoftwareSecurity",
    TABLE_USERS = "users",
    TABLE_PRODUCTS = "products",
    TABLE_MENUS = "menus";

const uri = `mongodb+srv://admin:fFnqq86Gi4fnsw3V@cluster0.zn4v2.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const stripe = new Stripe('sk_test_51JyK2rLfaOxbuUDdvs9PZaYWhIAlyieX7DhZWfsgHh3QEUbJ4Ex8b01zW51nO4nOTg5TwKZxSzj0qQfkCyJX1HyO00CSiXEbX4');

// export const getData = async (req, res) => {
//     const uid = req.body.uid;
//     //const data = req.body.data;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE).findOne({
//                 _id: typeof uid == "string" ? new ObjectId(uid) : uid
//             })
//             .then(user => {
//                 // TODO
//                 // let userData = {email: null, username: null, withdrawals: null, messages: null, wallet: null};
//                 // data.forEach(string => {
//                 //     switch (string) {
//                 //         case "email":
//                 //             userData.email = user.email;
//                 //             break;
//                 //         case "username":
//                 //             userData.username = user.username;
//                 //             break;
//                 //         case "withdrawals":
//                 //             userData.withdrawals = user.withdrawals;
//                 //             break;
//                 //         case "messages":
//                 //             userData.messages = user.messages;
//                 //             break;
//                 //         case "wallet":
//                 //             userData.wallet = user.wallet;
//                 //             break;
//                 //     }
//                 // });
//                 // res.json(userData);
//             });

//         client.close();
//     })
// }

// export const getProducts = async (req, res) => {
//     client.connect(async err => {
//         if (err) throw err;

//         res.json(await client.db(DATABASE).collection(TABLE_PRODUCTS).find({}).toArray());

//         client.close();
//     })
// }

export const getMenus = async (req, res) => {
    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(DATABASE).collection(TABLE_MENUS).find({}).toArray());

        client.close();
    })
}

export const getProduct = async (req, res) => {
    const productId = req.body.productId;

    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(DATABASE).collection(TABLE_PRODUCTS).findOne({
            _id: new ObjectId(productId)
        }));

        client.close();
    })
}

// export const loginWith2FA = async (req, res) => {
//     const user = req.body.user;

//     client.connect(async err => {
//         if (err) throw err;

//         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.username)) {
//             await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                     email: user.username
//                 })
//                 .then(async response => {
//                     if (response) {
//                         const [salt, key] = response.password.split(":");
//                         scrypt(user.password, salt, 64, (error, hash) => {
//                             if (error) throw error;
//                             else if (key === hash.toString("hex")) {
//                                 if (response.twofa_enabled) {
//                                     toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
//                                         if (error) res.json({
//                                             error: "server_error"
//                                         })
//                                         else res.json({
//                                             twofa: true,
//                                             uid: response._id,
//                                             data_url
//                                         });
//                                     });
//                                 } else {
//                                     res.json({
//                                         twofa: false,
//                                         uid: response._id
//                                     })
//                                 }
//                             } else res.json({
//                                 error: "wrong_combination"
//                             });
//                         });
//                     } else res.json({
//                         error: "wrong_combination"
//                     });
//                 });
//         } else {
//             await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                     username: user.username
//                 })
//                 .then(async response => {
//                     if (response) {
//                         const [salt, key] = response.password.split(":");
//                         scrypt(user.password, salt, 64, (error, hash) => {
//                             if (error) throw error;
//                             else if (key === hash.toString("hex")) {
//                                 if (response.twofa_enabled) {
//                                     toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
//                                         if (error) res.json({
//                                             error: "server_error"
//                                         })
//                                         else res.json({
//                                             twofa: true,
//                                             uid: response._id,
//                                             data_url
//                                         });
//                                     });
//                                 } else {
//                                     res.json({
//                                         twofa: false,
//                                         uid: response._id
//                                     })
//                                 }
//                             } else res.json({
//                                 error: "wrong_combination"
//                             });
//                         });
//                     } else res.json({
//                         error: "wrong_combination"
//                     });
//                 });
//         }
//         client.close();
//     })
// }

export const login = async (req, res) => {
    const user = req.body.user;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                username: user.username,
                password: user.password
            })
            .then(async response => res.json(response))

        client.close();
    })
}

const calculateOrderAmount = items => {
    let total = 0;

    items.map(item => total += (item.product.price * item.quantity));

    return total;
}

export const createPaymentIntent = async (req, res) => {
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

// export const createCheckoutSession = async (req, res) => {
//     const cart = req.body.cart;
//     const line_items = [];

//     cart.forEach(item => {
//         line_items.push({
//             price: checkPrice(item.product._id),
//             quantity: item.quantity,
//         })
//     });

//     const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: 'https://eatecats.com/success',
//             cancel_url: 'https://eatecats.com/cancel',
//         });

//     res.redirect(303, session.url);
// }

// const checkPrice = id => {
//     switch (id) {
//         case "619b71f0440564d4617ea857":
//             return "price_1JyayWLfaOxbuUDd6hSTsPql";
//         case "619b75aa440564d4617ea85e":
//             return "price_1JyayrLfaOxbuUDd7AozgcXk";
//         case "619b75ea440564d4617ea860":
//             return "price_1Jyaz5LfaOxbuUDdL0Jda3GN";
//         case "619b763f440564d4617ea861":
//             return "price_1JyazFLfaOxbuUDdaCYuwNEv";
//     }
// }

// export const verifyUserRegister = async (req, res) => {
//     const uid = req.body.uid;
//     const token = req.body.token;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                 _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//             })
//             .then(response => {
//                 return speakeasy.totp.verify({
//                     secret: response.twofa_secret.base32,
//                     encoding: "base32",
//                     token
//                 });
//             })
//             .then(async verified => {
//                 if (verified) {
//                     await client.db(DATABASE).collection(TABLE_USERS).updateOne({
//                             _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//                         }, {
//                             $set: {
//                                 twofa_enabled: true
//                             }
//                         })
//                         .then(response => {
//                             if (response.modifiedCount === 1) res.json({
//                                 error: "no_error"
//                             })
//                             else res.json({
//                                 error: "request_failed"
//                             })
//                         })
//                     client.close();
//                 } else res.json({
//                     error: "token_invalid"
//                 })
//             })
//     })
// }

// export const verifyUserLogin = async (req, res) => {
//     const uid = req.body.uid;
//     const token = req.body.token;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                 _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//             })
//             .then(response => {
//                 const verified = speakeasy.totp.verify({
//                     secret: response.twofa_secret.base32,
//                     encoding: "base32",
//                     token
//                 })

//                 if (verified) res.json({
//                     error: "no_error",
//                     user: response
//                 })
//                 else res.json({
//                     error: "token_invalid"
//                 })
//             });

//         client.close();
//     })
// }

// export const getDataUrl = async (req, res) => {
//     const uid = req.body.uid;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                 _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//             })
//             .then(response => {
//                 toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
//                     if (error) res.json({
//                         error: "server_error"
//                     })
//                     else {
//                         res.json({
//                             error: "no_error",
//                             data_url
//                         })
//                     }
//                 })
//             })

//         client.close();
//     })
// }

// export const enableTwofa = async (req, res) => {
//     const uid = req.body.uid;
//     const token = req.body.token;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                 _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//             })
//             .then(response => {
//                 return speakeasy.totp.verify({
//                     secret: response.twofa_secret.base32,
//                     encoding: "base32",
//                     token
//                 })
//             })
//             .then(async verified => {
//                 if (verified) {
//                     await client.db(DATABASE).collection(TABLE_USERS).updateOne({
//                             _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//                         }, {
//                             $set: {
//                                 twofa_enabled: true
//                             }
//                         })
//                         .then(response => {
//                             if (response.modifiedCount === 1) res.json({
//                                 error: "no_error"
//                             })
//                             else res.json({
//                                 error: "request_failed"
//                             })
//                         })

//                     client.close();
//                 } else {
//                     res.json({
//                         error: "token_invalid"
//                     });
//                 }
//             })
//     })
// }

// export const disableTwofa = async (req, res) => {
//     const uid = req.body.uid;
//     const token = req.body.token;

//     client.connect(async err => {
//         if (err) throw err;

//         await client.db(DATABASE).collection(TABLE_USERS).findOne({
//                 _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//             })
//             .then(response => {
//                 return speakeasy.totp.verify({
//                     secret: response.twofa_secret.base32,
//                     encoding: "base32",
//                     token
//                 })
//             })
//             .then(async verified => {
//                 if (verified) {
//                     await client.db(DATABASE).collection(TABLE_USERS).updateOne({
//                             _id: typeof uid === "string" ? new ObjectId(uid) : uid,
//                         }, {
//                             $set: {
//                                 twofa_enabled: false
//                             }
//                         })
//                         .then(response => {
//                             if (response.modifiedCount === 1) res.json({
//                                 error: "no_error"
//                             })
//                             else res.json({
//                                 error: "request_failed"
//                             })
//                         })

//                     client.close();
//                 } else {
//                     res.json({
//                         error: "token_invalid"
//                     });
//                 }
//             })
//     })
// }