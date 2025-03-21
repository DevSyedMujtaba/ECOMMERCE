const router = require('express').Router();
const Cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const {register,login} = require('../controllers/auth');


//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

module.exports = router;