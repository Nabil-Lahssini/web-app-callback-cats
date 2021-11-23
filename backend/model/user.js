const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, default: null },
    password: { type: String },
    token: { type: String },
    type: { type: String, default: 'normal' },
    orders: { type: Array, default: [] },
    twofa_secret: {type: Object, default: {} },
});

module.exports = mongoose.model('user', userSchema);