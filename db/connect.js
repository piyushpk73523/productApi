const mongoose = require("mongoose");

//const uri =
//  "mongodb+srv://piyushpk73:oj71JtLmD34tYQuR@piyushapi.fxrusl7.mongodb.net/PiyushApi?retryWrites=true&w=majority&appName=PiyushApi";

const connectDB = async (uri) => {
  try {
    //console.log("connect DB")
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
