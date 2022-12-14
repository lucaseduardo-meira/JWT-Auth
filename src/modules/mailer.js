const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { host, port, user, pass } = require("../config/mail.json");

var transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: { user, pass },
  tls: {
    rejectUnauthorized: false,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/resource/mail"),
    },
    viewPath: path.resolve("./src/resource/mail"),
    extName: ".html",
  })
);

module.exports = transport;
