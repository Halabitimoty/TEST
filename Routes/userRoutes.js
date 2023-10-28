const express = require("express");
const route = express.Router();

require("dotenv").config;

const {
  login,
  profile,
  register,
  deleteUser,
} = require("../Controller/authController");

const { isUserLoggedIn } = require("./middleware");

route.post("/register", register);

route.post("/login", login);

route.get("/profile", isUserLoggedIn, profile);

route.get("/deleteuser", isUserLoggedIn, deleteUser);

module.exports = route;
