import mongoose from "mongoose";

const testConnection = async() => {
  try{
    await mongoose.connect("mongodb+srv://2k23cs2313908_db_user:abhay2355@cluster0.nob0ann.mongodb.net/pennywise");
    console.log("mongoDB connected successfully");
    console.log("Database: pennywise");
    console.log("MongoDB is ready");

    await mongoose.connection.close();
    console.log("Test complete - connection closed");
  } catch (error){
    console.log("MongoDB connection failed:");
    console.log("Make sure MongoDB is ready");
    console.log("Run: net start MongoDB (As Administrator)");
  }
};

testConnection();