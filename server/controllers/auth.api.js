var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var user = require('../models/user');
var role = require('../models/role');

var jwt = require('jsonwebtoken');
// super secret for creating tokens
var superSecret = 'dotnettricks';

var user = require('../models/user');

router.post('/login', function(req, res) {
    user.findOne({ userName: req.body.userName, password: req.body.password })
        .select('_id fullName contactNo userName password roles')
        .populate('roles')
        .exec(function(err, user) {
            if (err) throw err;
            if (user !== undefined && user !== null) {
                // if user found then create a token
                var token = jwt.sign({
                    fullName: user.fullName,
                    userName: user.userName
                }, superSecret, {
                    expiresIn: 1440 * 60 // expires in 24 hours
                });

                var roles = [];
                for (var i = 0; i < user.roles.length; i++) {
                    roles.push(user.roles[i].name);
                }
                var authObj = {
                    userId: user._id,
                    userName: user.userName,
                    fullName: user.fullName,
                    contactNo: user.contactNo,
                    roles: roles,
                    token: token
                };

                // return the information including token as JSON
                res.send({
                    success: true,
                    authObj: authObj
                });
            } else {
                res.send({
                    success: false
                });
            }
        });
});

router.post('/signup', function(req, res) {
    var body = req.body;
    var obj = new user(body);

    //role.findOne({ name: 'Admin' }, function(err, res_role) {
    role.findOne({ name: 'User' }, function(err, res_role) {
        if (err) return res.send(err);

        obj.roles = [];
        var id = mongoose.Types.ObjectId(res_role._id);
        obj.roles.push(id);

        obj.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code === 11000)
                    return res.json({
                        success: false,
                        message: 'This username is already exists.'
                    });
                return res.send(err);
            } else {
                var _id = mongoose.Types.ObjectId(obj._id);
                res_role.users.push(_id);
                res_role.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                });
            }
            // return a message
            res.send("created");
        });
    });
});

module.exports = router;