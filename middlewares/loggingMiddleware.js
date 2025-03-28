const fs = require("fs");
const path = require("path");

// Middleware for logging
// This middleware will log every request in console that we will make.
const logFilePath = path.join(__dirname, '../logs/requests.log'); // Logs stored in logs/requests.log

const logRequest = (req, res, next) => {
  const logMessage = `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}\n`
  // Append log to the file
  fs.appendFile(logFilePath, logMessage, (err)=>{
    if(err){
      console.log('Error writing to log file: ', err);
      
    }
  });

  console.log(logMessage.trim()); // Optional: still logs to console
  
  next();

}

module.exports = logRequest;