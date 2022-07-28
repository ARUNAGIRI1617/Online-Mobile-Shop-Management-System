const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("login", { incorrect: "" });
});

router.get("/forgotpwd", function (req, res) {
  res.render("forgotpwd", { incorrect: "" });
});

router.get("/otp", function (req, res) {
  res.render("otp");
});

router.get("/newpwd", function (req, res) {
  res.render("newpwd");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/changepwd", function (req, res) {
  res.render("changepwd");
});

module.exports = router;
