var expresss = require("express");
var router = expresss.Router();

var category = require("../models/category.js");

router.get("/", function(req, res) {
        category.find({}, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send(data);
        });
    })
    .get("/:id", function(req, res) {
        var id = req.params.id;
        category.findById(id, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send(data);
        });
    }).post("/", function(req, res) {
        var body = req.body;
        var obj = new category(body);
        obj.save(function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("created");
        });
    })
    .put("/:id", function(req, res) {
        var id = req.params.id;
        var body = req.body;
        var obj = new category(body);
        category.findByIdAndUpdate(id, obj, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("updated");
        });
    })
    .delete("/:id", function(req, res) {
        var id = req.params.id;
        category.findByIdAndRemove(id, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("deleted");
        });
    });

module.exports = router;