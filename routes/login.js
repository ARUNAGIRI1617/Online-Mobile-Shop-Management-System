const express = require("express");
const { route } = require("./defaultRoutes");

const router = express.Router();

const fs = require("fs");

const path = require("path");

const dbConnection = require("../utils/databaseConnection");

const vars = require("../utils/variables");

const v = new vars.variables();

const userdb = dbConnection.userdbConnection();
const mobiledb = dbConnection.mobiledbConnection();
const cartdb = dbConnection.cartdbConnection();

router.post("/", function (req, res) {
  const userData = req.body;
  userdb.query(
    "select * from user where useremail = '" +
      userData.useremail +
      "' and userpwd = '" +
      userData.userpwd +
      "'",
    function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        res.render("login", { incorrect: "Incorrect Email and Password" });
      } else {
        v.enteredUser = result;
        v.login = 1;
        res.redirect("/index");
      }
    }
  );
});

router.get("/index", function (req, res) {
  mobiledb.query("select * from mobile order by sno;", function (err, result) {
    if (err) throw err;
    console.log(v.login);
    res.render("index", {
      login: v.login,
      enteredUser: v.enteredUser,
      mobiles: result,
    });
  });
});

router.post("/index", function (req, res) {
  const userCart = req.body;
  mobiledb.query(
    "select * from mobile where mobilename = '" + userCart.addtocart + "'",
    function (err, results) {
      if (err) throw err;
      for (const result of results) {
        console.log(result.sno);
        for (const user of v.enteredUser) {
          cartdb.query(
            "insert into " +
              user.username +
              "_cart values (" +
              result.sno +
              ",'" +
              result.mobilename +
              "' ," +
              result.price +
              ", '" +
              result.specs +
              "' ," +
              result.stock +
              ", '" +
              result.mobileimglink +
              "' , '" +
              result.brand +
              "' )",
            function (err) {
              if (err) throw err;
              console.log("values inserted");
            }
          );
        }
      }

      res.redirect("/cart");
    }
  );
});

router.get("/cart", function (req, res) {
  if (v.login === 0) {
    res.redirect("/");
  } else {
    for (const user of v.enteredUser) {
      cartdb.query(
        "select * from " + user.username + "_cart",
        function (err, result) {
          if (err) throw err;
          res.render("cart", {
            login: v.login,
            enteredUser: v.enteredUser,
            mobiles: result,
            cartlength: result.length,
          });
        }
      );
    }
  }
});

router.post("/cart", function (req, res) {
  const removeCart = req.body;
  for (const user of v.enteredUser) {
    cartdb.query(
      "delete from " +
        user.username +
        "_cart where mobilename = '" +
        removeCart.remfromcart +
        "'",
      function (err) {
        if (err) throw err;
        res.redirect("/cart");
      }
    );
  }
});

router.post("/changepwd", function (req, res) {
  const userPwdData = req.body;
  if (userPwdData.newUserPwd === userPwdData.confirmUserpwd) {
    for (const user of v.enteredUser) {
      userdb.query(
        "update user set userpwd = '" +
          userPwdData.confirmUserpwd +
          "' where userpwd = '" +
          userPwdData.currentUserPwd +
          "' and useremail = '" +
          user.useremail +
          "'"
      );
    }
  }
  res.redirect("/index");
});

router.get("/logout", function (req, res) {
  v.login = 0;
  res.redirect("/index");
});

module.exports = router;
