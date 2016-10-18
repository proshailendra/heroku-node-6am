var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Category = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    description: String,
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false });

var category = mongoose.model("categories", Category);
module.exports = category;