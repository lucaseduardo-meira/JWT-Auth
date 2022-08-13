const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const crypto = require("crypto");

const User = require("../models/User");
const { now } = require("mongoose");

const router = express.Router();
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuario já existe" });
    const user = await User.create(req.body);

    user.password = undefined;
    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Senha invalida" });

  user.password = undefined;
  res.send({ user, token: generateToken({ id: user.id }) });
});

router.post("/recover-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: "Usuario não encontrado" });

    const token = crypto.randomBytes(20).toString("hex");

    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 4);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: expire,
      },
    });

    console.log(token, expire);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro em esqueci minha senha, tente novamente" });
  }
});

module.exports = (app) => app.use("/auth", router);
