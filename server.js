require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./src/database/index");

const app = express();

console.log(process.env.MONGO_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "views/css")));

app.use("/", require("./src/router/routes"));

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log("Server running on http://localhost:3000");
// });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
  });
});
