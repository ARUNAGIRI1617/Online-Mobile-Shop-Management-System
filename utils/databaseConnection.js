const mysql = require("mysql");

function userdbConnection() {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "USERNAME",
    database: "PASSWORD",
  });
  return con;
}

function mobiledbConnection() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mobiledb",
  });
  return connection;
}

function cartdbConnection() {
  const cart = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cart",
  });
  return cart;
}

module.exports = {
  userdbConnection: userdbConnection,
  mobiledbConnection: mobiledbConnection,
  cartdbConnection: cartdbConnection,
};
