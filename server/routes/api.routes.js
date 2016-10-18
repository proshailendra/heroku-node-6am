var expresss = require("express");
var router = expresss.Router();

var connection = require("../config/db.js");
router.use("/category", require("../controllers/category.api.js"));
router.use("/file", require("../controllers/file.api.js"));
router.use("/product", require("../controllers/product.api.js"));
router.use("/store", require("../controllers/store.api.js"));
router.use("/auth", require("../controllers/auth.api.js"));

module.exports = router;