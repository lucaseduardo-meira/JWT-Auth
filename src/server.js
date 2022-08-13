const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET request
require("./app_config/controller/projectController")(app);
// Authentication
require("./app_config/controller/authController")(app);

app.listen(3000);
