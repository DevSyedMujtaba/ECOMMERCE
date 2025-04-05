const router = require('express').Router();
const Cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const {register,login} = require('../controllers/auth');
const { validateRequest } = require('../middlewares/validateRequestMiddleware');
const {signupSchema, loginSchema} = require('../validators/schemaValidation');


//REGISTER
router.post("/register", validateRequest(signupSchema, 'body'), register);

//LOGIN
router.post("/login",validateRequest(loginSchema, 'body'), login);

module.exports = router;