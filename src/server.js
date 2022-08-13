const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET request
require("./controller/projectController")(app);
// Authentication
require("./controller/authController")(app);

app.listen(3000);
