const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "views/css")));

app.use("/", require("./src/router/routes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
