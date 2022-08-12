const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://lucasmeira:<password>@cluster0.ql8xc.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
