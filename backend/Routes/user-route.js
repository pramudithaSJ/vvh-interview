const express = require("express");
const router = express.Router();
const controller = require("../Controllers/user-controller");

router.route("/register").post((req, res) => {
  controller.createUser(req, res);
});

router.route("/login").post((req, res) => {
  controller.loginUser(req, res);
});

module.exports = router;
