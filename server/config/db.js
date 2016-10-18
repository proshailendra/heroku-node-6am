var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/shoopingsite_6am');

module.exports = connection;