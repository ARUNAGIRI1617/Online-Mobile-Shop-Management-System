const nodemailer = require("nodemailer");


function connectMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "username@gmail.com",
      pass: "dbms@321",
    },
  });
  return transporter;
}

module.exports = {
  connectMail: connectMail,
};
