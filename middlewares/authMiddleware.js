  
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) =>{
  const token = req.header('Authorization')

  if(!token){
    return res.status(401).json({message: "Access Denied! No token provided"});
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SEC);
    req.User = decoded; // Store user info in request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }

}

module.exports = authMiddleware