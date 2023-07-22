const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// set token secret and expiration date
dotenv.config();
const secret = process.env.JWT_SECRET;
const expiration = '24h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
    } catch (err) {
      throw new AuthenticationError('invalid token!');
    }
    // send to next endpoint
    return req;
  },
  // Add firstName, lastName to add to token
  signToken: function ({ id, firstName, lastName, email }) {
    const payload = { id, firstName, lastName, email };
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    return token;
  },
};
