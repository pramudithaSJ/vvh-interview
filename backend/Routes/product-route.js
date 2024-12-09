const express = require("express");
const router = express.Router();
const controller = require("../Controllers/product-controller");

router.route("/").get((req, res) => {
  controller.getAllProducts(req, res);
});

module.exports = router;
