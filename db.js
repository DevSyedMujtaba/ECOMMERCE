const mongoose = require('mongoose');

// Database connection
const dbConnection = async () =>{
    try{
await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
    console.log("DB Connection successful");
}catch(err){
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
}}

module.exports = dbConnection