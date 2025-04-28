const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAdminMiddleware = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1] ;                            

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Access denied: No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        
        // Find user with additional role check
        const user = await User.findOne({
            _id: decoded.id,
            role: 'admin' // Ensures only admins can pass
        });

        if (!user) {
            return res.status(403).json({ 
                success: false,
                message: 'Admin privileges required'
            });
        }

        // Attach user to request
        req.user = user;
        next();
       
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};

module.exports= isAdminMiddleware