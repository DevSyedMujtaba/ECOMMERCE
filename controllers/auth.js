const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cryptojs = require('crypto-js');  


// REGISTER
const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

// LOGIN
const login = async (req, res) => {

    try {

        //FIND USER
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong email!");
        }


        //DECRYPT PASSWORD
        const hashedPassword = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);


        //CHECK IF PASSWORD IS CORRECT
        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong password!");
        }

        

        //SEND RESPONSE IF PASSWORD IS CORRECT
        // const { password, ...others } = user._doc;
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SEC, {expiresIn: "1h",});
        res.status(200).json({token, user});

    } catch (err) {
        res.status(500).json(err);
    }


}

module.exports = {
    register,
    login
}