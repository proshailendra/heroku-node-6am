var express = require('express');
var router = express.Router();

var product = require('../models/product');

//GET All
router.get('/', function(req, res) {
    product.find({}, function(err, data) {
        res.send(data);
    });
}).get('/:id', function(req, res) {
    var id = req.params.id;
    product.findById(id, function(err, data) {
        res.send(data[0]);
    });
}).post('/', function(req, res) {
    var obj = req.body;
    var objProd = new product(obj);
    objProd.save(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.send('created');
        }
    });
}).delete('/:id', function(req, res) {
    var id = req.params.id;
    product.findByIdAndRemove(id, function(err) {
        if (err) res.json(err);
        res.send('deleted');
    });
});

module.exports = router;