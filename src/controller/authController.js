const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = User.create(req.body);
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});

modules.exports = (app) => app.use("/auth", router);
