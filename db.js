// backend/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://soorajaheer9:U74Tk1PQZVcOKZxU@test.rmiis3l.mongodb.net/?retryWrites=true&w=majority&appName=test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);  // Exit on error
  }
};

module.exports = connectDB;
