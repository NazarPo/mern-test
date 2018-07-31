const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema, 'guests');
module.exports = User;