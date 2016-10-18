var express = require('express');
var router = express.Router();

var product = require('../models/product');
var cart = require('../models/cart');
var order = require('../models/order');
var transaction = require('../models/transaction');

//GET All
router.get('/', function(req, res) {
    product.find({}, function(err, data) {
        res.send(data);
    });
}).get('/:id', function(req, res) {
    var id = req.params.id;
    product.findById(id, function(err, data) {
        res.send(data);
    });
}).post('/cart', function(req, res) {
    var obj = req.body;
    obj.createdDate = new Date();
    var objCart = new cart(obj);
    objCart.save(function(err) {
        // console.log(err);
        if (err) {
            res.send(err);
        } else {
            //   console.log(objCart);
            res.send({
                id: objCart._id
            });
        }
    });
}).post('/paymentstatus', function(req, res) { //payment staus from payment gateway
    var objPayment = req.body;

    var obj = {
        cartId: objPayment.udf1,
        userId: objPayment.udf2,
        amount: objPayment.amount,
        paymentType: objPayment.mode,
        status: objPayment.status,
        transactionId: objPayment.txnid,
        createdDate: new Date()
    };

    var objTransaction = new transaction(obj);
    objTransaction.save(function(error) {
        if (error) {
            res.json(error);
        } else {
            cart.findById(obj.cartId, function(err, data) {
                if (error) {
                    res.json(error);
                } else {
                    //  console.log("3.", data);
                    var _obj = {
                        cartId: data._id,
                        items: data.items,
                        tax: data.tax,
                        total: data.total,
                        discount: data.discount,
                        grandTotal: data.grandTotal,
                        payableAmount: data.payableAmount,
                        userId: data.userId,
                        shippingAddress: "Delhi",
                        contactNo: "999999999",
                        createdDate: new Date()
                    };

                    var objOrder = new order(_obj); // console.log("3.1.", objOrder);
                    objOrder.save(function(error) {
                        if (error) {
                            res.json(error);
                        } else {
                            var receiptObj = {
                                name: objPayment.firstname,
                                email: objPayment.email,
                                transactionId: objPayment.txnid,
                                amount: objPayment.amount,
                                status: objPayment.status
                            };
                            req.session.receipt = receiptObj;
                            res.redirect('/receipt');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;