//Import the mongoose module
import mongoose from "mongoose";

// connect to mongoodb
mongoose.connect("mongodb://root:accelbyte@mongo:27017/");

//Get the default connection
const database = mongoose.connection;

database.once("open", function() {
  console.log("MongoDB database connection established succesfully");
});

database.on("error", console.error.bind(console, "MongoDB connection error:"));

export default mongoose;
