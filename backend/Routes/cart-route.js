const express = require("express");
const router = express.Router();
const controller = require("../Controllers/cart-controller");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/").post(authMiddleware, (req, res) => {
  controller.createCart(req, res);
});
router.route("/").get(authMiddleware, (req, res) => {
  controller.getCartByUserId(req, res);
});
router.route("/:id").delete(authMiddleware, (req, res) => {
  controller.deleteCart(req, res);
});

module.exports = router;
