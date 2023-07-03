const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.jwtSecret;
const expiration = config.jwt.expiresIn;

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign(user, secret, { expiresIn: expiration });
};

// Verify a JWT token
const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };