const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')


async function authenticateToken(req, res, next) {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({ error: 'Unauthorized Access' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id);
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
}

module.exports = { authenticateToken };