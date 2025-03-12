const router = require('express').Router();
const User = require('../models/User');


// CREATE A USER
// router.post("/addUser", async (req, res)=>{
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         isAdmin: req.body.isAdmin,
//     });

//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
        
//     } catch (err) {
//         res.status(500).json("Error while adding the user in the Database" +err);
//     }
// });
module.exports = router;