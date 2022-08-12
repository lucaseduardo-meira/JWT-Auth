const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

module.exports = mongoose;
