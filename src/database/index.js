const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/jwtapp");
mongoose.Promise = global.Promise;

module.exports = mongoose;
