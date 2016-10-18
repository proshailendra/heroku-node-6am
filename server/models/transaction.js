// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// create a schema
var transactionSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
    paymentType: { type: String },
    userId: { type: ObjectId, required: true },
    cartId: { type: ObjectId, required: true },
    amount: { type: Number, required: true },
    createdDate: { type: Date, required: true },
    updatedDate: Date
}, {
    versionKey: false
});
// make this available to our carts in our Node applications
module.exports = mongoose.model('transactions', transactionSchema);