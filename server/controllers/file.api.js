var express = require('express'),
    path = require("path"),
    multer = require('multer');

var router = express.Router();

var filePath = path.join(__dirname, '../../app/uploads');
var absPath = "";

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, filePath);
    },
    filename: function(req, file, callback) {
        var arr = file.originalname.split('.');
        var fileExt = arr[arr.length - 1];
        var filename = file.fieldname + '-' + Date.now() + '.' + fileExt;
        absPath = '../uploads' + "/" + filename;
        callback(null, filename);
    }
});

//'file' is the name of passing parameters
var upload = multer({ storage: storage }).single('file');

router.post('/', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.send({ filePath: "error" });
            return;
        }
        res.send({ filePath: absPath });
    });
});

module.exports = router;