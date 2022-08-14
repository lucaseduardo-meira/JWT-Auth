const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", require("./app_config/controller/loginController"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
