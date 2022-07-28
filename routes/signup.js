const express = require("express");

const router = express.Router();

const fs = require("fs");

const path = require("path");

const dbConnection = require("../utils/databaseConnection");

const userdb = dbConnection.userdbConnection();
const cartdb = dbConnection.cartdbConnection();

router.post("/signup", function (req, res) {
  const userData = req.body;
  const filePath = path.join(__dirname, "..", "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const storedUsers = JSON.parse(fileData);
  storedUsers.push(userData);
  fs.writeFileSync(filePath, JSON.stringify(storedUsers));

  userdb.query(
    "insert into user values ('" +
      userData.username +
      "'," +
      "'" +
      userData.useremail +
      "'," +
      "'" +
      userData.userpwd +
      "')",
    function (err) {
      if (err) throw err;
      console.log("values inserted");
    }
  );
  cartdb.query(
    "create table " +
      userData.username +
      "_cart ( sno int , mobilename varchar(100) , price int , specs varchar(1000) , stock int , mobileimglink varchar(1000), brand varchar(100) )",
    function (err) {
      if (err) throw err;
      console.log("Table created");
    }
  );

  res.redirect("/");
});

module.exports = router;
