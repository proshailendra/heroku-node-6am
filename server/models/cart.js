var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// create a schema
var cartItemSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    productId: { type: ObjectId, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
});

// create a schema
var cartSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    cartName: { type: String, required: true },
    items: [cartItemSchema], //embedded document
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number },
    grandTotal: { type: Number, required: true },
    payableAmount: { type: Number, required: true },
    userId: { type: mongoose.Schema.ObjectId, required: true },
    createdDate: { type: Date, required: true }
}, {
    versionKey: false
});
// make this available to our carts in our Node applications
module.exports = mongoose.model('carts', cartSchema);