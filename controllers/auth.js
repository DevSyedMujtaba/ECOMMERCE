const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cryptojs = require('crypto-js'); 

// REGISTER
const register = async (req, res) => {
    try {

        const doesExist = await User.findOne({email: req.body.email});
        if(doesExist){
            console.log('This email is already been registered');
            return res.status(409).json({ error: "Email is already registered." });
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
    } catch (err) {
        if (err.isJoi === true){
            err.status = 422
            res.status(422).json('Joi Error '+ err)
        } 
        else{
        res.status(500).json('Server Error '+ err);
        }
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
        }, process.env.JWT_SEC, {expiresIn: "3d",});

        //STORING TOKEN IN COOKIE
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            maxAge: 259200000
        })
        return res.status(200).json({token, user});

    } catch (err) {
        res.status(500).json('Internal server error '+err);
    }


}

module.exports = {
    register,
    login
}