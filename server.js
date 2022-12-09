const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "views/css")));

app.use("/", require("./src/router/routes"));

const PORT = process.env.PORT || 3000;
mongo_uri = process.env.MONGO_URI || "mongodb://localhost/jwtapp";

mongoose.connect(mongo_uri, function (error) {
  if (error) {
    return console.log("error", error);
  }
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
  });
});

module.exports = mongoose;
