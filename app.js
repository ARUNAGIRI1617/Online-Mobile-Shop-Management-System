const express = require("express");

const app = express();

const path = require("path");

// utility functions
const vars = require("./utils/variables");

const v = new vars.variables();

//Routes
const defaultRoutes = require("./routes/defaultRoutes");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const forgotPassRoutes = require("./routes/forgotPass");

const { error } = require("console");
const e = require("express");
const { redirect } = require("express/lib/response");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", forgotPassRoutes);

app.use(function (req, res) {
  res.render("404", { login: v.login, enteredUser: v.enteredUser });
});

app.use(function (error, req, res, next) {
  res.render("500", { login: v.login, enteredUser: v.enteredUser });
});

app.listen(3000);
