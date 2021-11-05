import {
    MongoClient,
    ObjectId
} from "mongodb";
import {
    randomBytes,
    scrypt
} from "crypto";
import speakeasy from "speakeasy";
import {
    toDataURL
} from "qrcode";

const DATABASE = "SoftwareSecurity", TABLE_USERS = "users", TABLE_PRODUCTS = "products", TABLE_PROMOTIONS = "promotions", TABLE_MENUS = "menus";

const uri = `mongodb+srv://admin:fFnqq86Gi4fnsw3V@cluster0.zn4v2.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

// export const getCompanies = async (req, res) => {
//     client.connect(async err => {
//         if (err) throw err;

//         res.json(await client.db("FW").collection("company").find({}).toArray());

//         client.close();
//     })
// }

export const getProducts = async (req, res) => {
    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(DATABASE).collection(TABLE_PRODUCTS).find({}).toArray());

        client.close();
    })
}

export const getMenus = async (req, res) => {
    client.connect(async err => {
        if (err) throw err;

        res.json(await client.db(DATABASE).collection(TABLE_MENUS).find({}).toArray());

        client.close();
    })
}

export const login = async (req, res) => {
    const user = req.body.user;

    client.connect(async err => {
        if (err) throw err;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.username)) {
            await client.db(DATABASE).collection(TABLE_USERS).findOne({
                    email: user.username
                })
                .then(async response => {
                    if (response) {
                        const [salt, key] = response.password.split(":");
                        scrypt(user.password, salt, 64, (error, hash) => {
                            if (error) throw error;
                            else if (key === hash.toString("hex")) {
                                if (response.twofa_enabled) {
                                    toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
                                        if (error) res.json({
                                            error: "server_error"
                                        })
                                        else res.json({
                                            twofa: true,
                                            uid: response._id,
                                            data_url
                                        });
                                    });
                                } else {
                                    res.json({
                                        twofa: false,
                                        uid: response._id
                                    })
                                }
                            } else res.json({
                                error: "wrong_combination"
                            });
                        });
                    } else res.json({
                        error: "wrong_combination"
                    });
                });
        } else {
            await client.db(DATABASE).collection(TABLE_USERS).findOne({
                    username: user.username
                })
                .then(async response => {
                    if (response) {
                        const [salt, key] = response.password.split(":");
                        scrypt(user.password, salt, 64, (error, hash) => {
                            if (error) throw error;
                            else if (key === hash.toString("hex")) {
                                if (response.twofa_enabled) {
                                    toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
                                        if (error) res.json({
                                            error: "server_error"
                                        })
                                        else res.json({
                                            twofa: true,
                                            uid: response._id,
                                            data_url
                                        });
                                    });
                                } else {
                                    res.json({
                                        twofa: false,
                                        uid: response._id
                                    })
                                }
                            } else res.json({
                                error: "wrong_combination"
                            });
                        });
                    } else res.json({
                        error: "wrong_combination"
                    });
                });
        }
        client.close();
    })
}

export const register = async (req, res) => {
    const user = req.body.user;

    let username_already_exists, email_already_exists = false;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                username: user.username
            })
            .then(response => {
                if (response) username_already_exists = true;
            });

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                email: user.email
            })
            .then(response => {
                if (response) email_already_exists = true;
            });

        if (!username_already_exists && !email_already_exists) {
            const salt = randomBytes(16).toString("hex");

            scrypt(user.password, salt, 64, async (error, hash) => {
                if (error) throw error;
                else {
                    let u = {
                        _id: new ObjectId(),
                        username: user.username,
                        email: user.email,
                        password: `${salt}:${hash.toString("hex")}`,
                        twofa_secret: speakeasy.generateSecret(),
                        twofa_enabled: false,
                        messages: [],
                        withdrawals: [],
                        wallet: {
                            balance: 0
                        }
                    };

                    await client.db(DATABASE).collection(TABLE_USERS).insertOne(u)
                        .then(result => {
                            if (result.insertedId) {
                                toDataURL(u.twofa_secret.otpauth_url, (error, data_url) => {
                                    if (error) res.json({
                                        error: "server_error"
                                    })
                                    else {
                                        res.json({
                                            error: "no_error",
                                            uid: u._id,
                                            data_url
                                        })
                                    }
                                })
                            } else res.json({
                                error: "server_error"
                            })
                        })

                    client.close();
                }
            });
        } else {
            res.json({
                username_already_exists,
                email_already_exists
            });
        }
    })
}

export const changeEmail = async (req, res) => {
    const uid = req.body.uid;
    const emailForm = req.body.emailForm;

    if (emailForm.oldEmail == "" || emailForm.newEmail == "" || emailForm.confirmNewEmail == "") res.json({
        error: "empty_inputs"
    })
    else if (emailForm.newEmail != emailForm.confirmNewEmail) res.json({
        error: "email_addresses_dont_match"
    })
    else if (emailForm.oldEmail == emailForm.newEmail) res.json({
        error: "new_email_same_as_old_email"
    })
    else {
        client.connect(async err => {
            if (err) throw err;

            await client.db(DATABASE).collection(TABLE_USERS).updateOne({
                    _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                    email: emailForm.oldEmail
                }, {
                    $set: {
                        email: emailForm.newEmail
                    }
                })
                .then(async response => {
                    if (response.matchedCount === 0) res.json({
                        error: "wrong_email"
                    });
                    else if (response.modifiedCount === 1) res.json({
                        error: "no_error"
                    });
                    else res.json({
                        error: "request_failed"
                    });
                });
            client.close();
        })
    }
}

export const changePassword = async (req, res) => {
    const uid = req.body.uid;
    const passwordForm = req.body.passwordForm;

    if (passwordForm.oldPassword == "" || passwordForm.newPassword == "" || passwordForm.confirmNewPassword == "") res.json({
        error: "empty_inputs"
    })
    else if (passwordForm.newPassword != passwordForm.confirmNewPassword) res.json({
        error: "passwords_dont_match"
    })
    else {
        const newSalt = randomBytes(16).toString("hex");

        scrypt(passwordForm.newPassword, newSalt, 64, async (error, newHash) => {
            if (error) throw error;
            else {
                client.connect(async err => {
                    if (err) throw err;

                    await client.db(DATABASE).collection(TABLE_USERS).findOne({
                            _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                        })
                        .then(user => {
                            const [oldSalt, key] = user.password.split(":");
                            scrypt(passwordForm.oldPassword, oldSalt, 64, async (error, oldHash) => {
                                if (error) throw error;
                                else if (key === oldHash.toString("hex")) {
                                    await client.db(DATABASE).collection(TABLE_USERS).updateOne({
                                            _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                                            password: user.password
                                        }, {
                                            $set: {
                                                password: `${newSalt}:${newHash.toString("hex")}`
                                            }
                                        })
                                        .then(response => {
                                            if (response.matchedCount === 0) res.json({
                                                error: "wrong_password"
                                            })
                                            else if (response.modifiedCount === 1) res.json({
                                                error: "no_error"
                                            })
                                            else res.json({
                                                error: "request_failed"
                                            })
                                        });
                                    client.close();
                                } else res.json({
                                    error: "wrong_password"
                                })
                            })
                        })
                })
            }
        });
    }
}

export const verifyUserRegister = async (req, res) => {
    const uid = req.body.uid;
    const token = req.body.token;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                _id: typeof uid === "string" ? new ObjectId(uid) : uid,
            })
            .then(response => {
                return speakeasy.totp.verify({
                    secret: response.twofa_secret.base32,
                    encoding: "base32",
                    token
                });
            })
            .then(async verified => {
                if (verified) {
                    await client.db(DATABASE).collection(TABLE_USERS).updateOne({
                            _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                        }, {
                            $set: {
                                twofa_enabled: true
                            }
                        })
                        .then(response => {
                            if (response.modifiedCount === 1) res.json({
                                error: "no_error"
                            })
                            else res.json({
                                error: "request_failed"
                            })
                        })
                    client.close();
                } else res.json({
                    error: "token_invalid"
                })
            })
    })
}

export const verifyUserLogin = async (req, res) => {
    const uid = req.body.uid;
    const token = req.body.token;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                _id: typeof uid === "string" ? new ObjectId(uid) : uid,
            })
            .then(response => {
                const verified = speakeasy.totp.verify({
                    secret: response.twofa_secret.base32,
                    encoding: "base32",
                    token
                })

                if (verified) res.json({
                    error: "no_error",
                    user: response
                })
                else res.json({
                    error: "token_invalid"
                })
            });

        client.close();
    })
}

export const getDataUrl = async (req, res) => {
    const uid = req.body.uid;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                _id: typeof uid === "string" ? new ObjectId(uid) : uid,
            })
            .then(response => {
                toDataURL(response.twofa_secret.otpauth_url, (error, data_url) => {
                    if (error) res.json({
                        error: "server_error"
                    })
                    else {
                        res.json({
                            error: "no_error",
                            data_url
                        })
                    }
                })
            })

        client.close();
    })
}

export const enableTwofa = async (req, res) => {
    const uid = req.body.uid;
    const token = req.body.token;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                _id: typeof uid === "string" ? new ObjectId(uid) : uid,
            })
            .then(response => {
                return speakeasy.totp.verify({
                    secret: response.twofa_secret.base32,
                    encoding: "base32",
                    token
                })
            })
            .then(async verified => {
                if (verified) {
                    await client.db(DATABASE).collection(TABLE_USERS).updateOne({
                            _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                        }, {
                            $set: {
                                twofa_enabled: true
                            }
                        })
                        .then(response => {
                            if (response.modifiedCount === 1) res.json({
                                error: "no_error"
                            })
                            else res.json({
                                error: "request_failed"
                            })
                        })

                    client.close();
                } else {
                    res.json({
                        error: "token_invalid"
                    });
                }
            })
    })
}

export const disableTwofa = async (req, res) => {
    const uid = req.body.uid;
    const token = req.body.token;

    client.connect(async err => {
        if (err) throw err;

        await client.db(DATABASE).collection(TABLE_USERS).findOne({
                _id: typeof uid === "string" ? new ObjectId(uid) : uid,
            })
            .then(response => {
                return speakeasy.totp.verify({
                    secret: response.twofa_secret.base32,
                    encoding: "base32",
                    token
                })
            })
            .then(async verified => {
                if (verified) {
                    await client.db(DATABASE).collection(TABLE_USERS).updateOne({
                            _id: typeof uid === "string" ? new ObjectId(uid) : uid,
                        }, {
                            $set: {
                                twofa_enabled: false
                            }
                        })
                        .then(response => {
                            if (response.modifiedCount === 1) res.json({
                                error: "no_error"
                            })
                            else res.json({
                                error: "request_failed"
                            })
                        })

                    client.close();
                } else {
                    res.json({
                        error: "token_invalid"
                    });
                }
            })
    })
}