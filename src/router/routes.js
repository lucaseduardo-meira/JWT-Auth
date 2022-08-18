const express = require("express");
const route = express.Router();

const authController = require("../app_config/controller/authController");
const authMiddleware = require("../app_config/middlewares/auth");
const loginController = require("../app_config/controller/loginController");
const services = require("../app_config/services/render");

// Login page
route.get("/login", services.login);
route.post("/login", authController.authenticate);

//Register page
route.get("/register", services.register);
route.post("/register", authController.create);

// Recover-password page
route.get("/recover-password", services.recover_password);
route.post("/recover-password", authController.recover_password);

// Reset password page
route.get("/reset-password", services.reset_password);
route.post("/reset-password", authController.reset_password);

//Home page
route.get("/", loginController.login);

module.exports = route;
