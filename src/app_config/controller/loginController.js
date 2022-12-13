const { name } = require("ejs");
const express = require("express");
const authMiddleware = require("../middlewares/auth");
const route = express.Router();

const User = require("../models/user");

module.exports = {
  async login(req, res) {
    const user_id = req.userId;
    const name = await User.findById(user_id, "name");
    res.status(200).send(`Usuario ${name}`);
  },
};
