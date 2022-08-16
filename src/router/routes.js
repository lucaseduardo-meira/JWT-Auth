const express = require("express");
const route = express.Router();

const authController = require("../app_config/controller/authController");
const authMiddleware = require("../app_config/middlewares/auth");
const services = require("../app_config/services/render");

// Login page
route.get("/login", services.home);
route.post("/login", authController.authenticate);

//Register page
route.get("/register", services.register);

module.exports = route;
