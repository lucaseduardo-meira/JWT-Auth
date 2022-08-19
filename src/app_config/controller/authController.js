const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const User = require("../models/User");
const { now } = require("mongoose");

const router = express.Router();
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "Usuario já existe" });
      }
      const user = await User.create(req.body);

      return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Falha no registro" });
    }
  },
  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Senha invalida" });

    user.password = undefined;
    res.send("Logado:", { user, token: generateToken({ id: user.id }) });
  },
  async recover_password(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).send({ error: "Usuario não encontrado" });

      const token = crypto.randomBytes(20).toString("hex");

      const expire = new Date();
      expire.setMinutes(expire.getMinutes() + 4);

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: expire,
        },
      });

      mailer.sendMail(
        {
          to: email,
          from: "jwtproject@gmail.com",
          template: "recover_password",
          context: { token },
        },
        (err) => {
          if (err)
            return res.status(400).send({
              error: "Não conseguimos enviar o email esqueci minha senha",
            });

          res.redirect("/reset-password");
        }
      );
    } catch (err) {
      res
        .status(400)
        .send({ error: "Erro em esqueci minha senha, tente novamente" });
    }
  },
  async reset_password(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email }).select(
        "+passwordResetToken passwordResetExpires"
      );
      if (!user)
        return res.status(400).send({ error: "Usuario não encontrado" });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: "Token invalido" });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: "Token expirado, gere um novo" });

      user.password = password;

      await user.save();
      res.send();
    } catch (err) {
      res.status(400).send({ error: "Cannot reset password, try again" });
    }
  },
};

// router.post("login", async (req,res) => {}
// const { email } = req.body;
//   try {
//     if (await User.findOne({ email }))
//       return res.status(400).send({ error: "Usuario já existe" });
//     const user = await User.create(req.body);

//     user.password = undefined;
//     return res.send({ user, token: generateToken({ id: user.id }) });
//   } catch (err) {
//     return res.status(400).send({ error: "Falha no registro" });
//   })
// router.post("/authenticate", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

//   if (!(await bcrypt.compare(password, user.password)))
//     return res.status(400).send({ error: "Senha invalida" });

//   user.password = undefined;
//   res.send({ user, token: generateToken({ id: user.id }) });
// });

// router.post("/recover-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send({ error: "Usuario não encontrado" });

//     const token = crypto.randomBytes(20).toString("hex");

//     const expire = new Date();
//     expire.setMinutes(expire.getMinutes() + 4);

//     await User.findByIdAndUpdate(user.id, {
//       $set: {
//         passwordResetToken: token,
//         passwordResetExpires: expire,
//       },
//     });

//     mailer.sendMail(
//       {
//         to: email,
//         from: "lucasmeira@gmail.com",
//         template: "recover_password",
//         context: { token },
//       },
//       (err) => {
//         if (err)
//           return res.status(400).send({
//             error: "Não conseguimos enviar o email esqueci minha senha",
//           });

//         return res.status(200);
//       }
//     );
//   } catch (err) {
//     res
//       .status(400)
//       .send({ error: "Erro em esqueci minha senha, tente novamente" });
//   }
// });

// router.post("/reset-password", async (req, res) => {
//   const { email, token, password } = req.body;

//   try {
//     const user = await User.findOne({ email }).select(
//       "+passwordResetToken passwordResetExpires"
//     );
//     if (!user) return res.status(400).send({ error: "Usuario não encontrado" });

//     if (token !== user.passwordResetToken)
//       return res.status(400).send({ error: "Token invalido" });

//     const now = new Date();

//     if (now > user.passwordResetExpires)
//       return res.status(400).send({ error: "Token expirado, gere um novo" });

//     user.password = password;

//     await user.save();
//     res.send();
//   } catch (err) {
//     res.status(400).send({ error: "Cannot reset password, try again" });
//   }
// });

// module.exports = (app) => app.use("/auth", router);
