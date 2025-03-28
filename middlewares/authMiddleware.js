const Cryptojs = require('crypto-js');  
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

// passport.use(new LocalStrategy(async (username, password, done) => {
//   // Authentication logic here
//   try {
//     console.log('Received Credentials: ', username, password);
//     const user = await User.findOne({ username: username });
//     if (!user)
//       return done(null, false, { message: 'Incorrect username' });

//     //DECRYPT PASSWORD
//             const hashedPassword = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
//             const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);
    

//     const isPasswordMatch = originalPassword === password ? true : false;
//     if (isPasswordMatch) {
//       return done(null, user);

//     } else {
//       return done(null, false, { message: 'Incorrect password' });
//     }

//   } catch (err) {

//     return done(err);
//   }
// }))

// const localAuthMiddleware = passport.authenticate('local', {session: false})

module.exports = authMiddleware