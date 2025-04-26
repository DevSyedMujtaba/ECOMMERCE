const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAdminMiddleware = async(req,res,next) =>{
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided'});
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SEC)
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(403).json({ message: 'User not found'});
        }
        if(user.role !== 'admin'){
            return res.status(403).json({ success: false, message: 'Unauthorized: not an Admin'});
        }
        next()
       
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' +err});
    }
}

module.exports= isAdminMiddleware