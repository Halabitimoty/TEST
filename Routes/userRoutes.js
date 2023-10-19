const express = require("express");
const route = express.Router();

require("dotenv").config;

const { login, profile, register } = require("../Controller/authController");
const { isUserLoggedIn } = require("./middleware");

route.post("/register", register);

route.post("/login", login);

route.get("/profile", isUserLoggedIn, profile);

module.exports = route;
