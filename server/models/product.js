var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
//var category = require('../models/category');
// create a schema
var productSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    imagePath: { type: String, required: true },
    categoryId: { type: ObjectId, ref: 'categories' }, //relation
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: Date
}, {
    versionKey: false
});
// make this available to our carts in our Node applications
module.exports = mongoose.model('products', productSchema);