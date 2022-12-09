const mongoose = require("mongoose");

mongo_uri = process.env.MONGO_URI || "mongodb://localhost/jwtapp"

mongoose.connect(mongo_uri);
mongoose.Promise = global.Promise;

module.exports = mongoose;
