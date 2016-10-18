var mongoose = require('mongoose');
//var role = require('../models/role');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    roles: [{ type: mongoose.Schema.ObjectId, ref: 'roles' }], //relation m:m
    contactNo: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: Date
}, {
    versionKey: false
});

// make this available to our carts in our Node applications
module.exports = mongoose.model('users', userSchema);