const express = require("express");
const { append } = require("express/lib/response");

const router = express.Router();

const dbConnection = require("../utils/databaseConnection");
const mailConnection = require("../utils/mailConnection");
const vars = require("../utils/variables");

const userdb = dbConnection.userdbConnection();

const transporter = mailConnection.connectMail();

const v = new vars.variables();

router.post("/forgotpwd", function (req, res) {
  const enteredEmail = req.body;
  userdb.query(
    "select * from user where useremail ='" + enteredEmail.useremail + "'",
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length === 0) {
        res.render("forgotpwd", { incorrect: "Email id not found" });
      } else {
        let otp = Math.floor(Math.random() * 1000000) + 100000;
        v.otpNo = otp;
        const mailOptions = {
          from: "ombs24s3@gmail.com",
          to: enteredEmail.useremail,
          subject: "OTP",
          text: otp.toString(),
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
          }
        });
        res.redirect("/otp");
      }
    }
  );
});

router.post("/otp", function (req, res) {
  const enteredOtp = req.body;
  const otp = parseInt(enteredOtp.OTP);
  console.log(otp);
  console.log(otpNo);
  if (v.otpNo === otp) {
    res.redirect("/newpwd");
  } else {
    res.redirect("/index");
  }
});

module.exports = router;
