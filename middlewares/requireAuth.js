const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
        return res.status(401).json({err: 'Authorization must be required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        req.user = await User.findById(id).select(id);

        next();
    } catch (err) {
        res.status(401).json({err: 'Request is not authorized'})
    }
}

module.exports = requireAuth;