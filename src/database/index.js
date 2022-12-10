const mongoose = require("mongoose");

mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongo_uri);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.Promise = global.Promise;

module.exports = { mongoose, connectDB };
