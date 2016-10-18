var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var user = require('../models/user');

var roleSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    users: [{ type: mongoose.Schema.ObjectId, ref: 'users' }], //relation m:m
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: Date
}, {
    versionKey: false
});
// make this available to our carts in our Node applications
module.exports = mongoose.model('roles', roleSchema);