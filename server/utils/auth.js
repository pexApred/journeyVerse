const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// set token secret and expiration date
dotenv.config();
const secret = process.env.JWT_SECRET;
const expiration = '24h';

if (!secret) {
  throw new Error('JWT secret is missing!');
}

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.headers.authorization;

    if (req.headers.authorization) {
          // ["Bearer", "<tokenvalue>"]
      token = req.headers.authorization.split(' ').pop().trim();
    } else if (req.body.token) {
      token = req.body.token;
    }

    if (!token) {
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (err) {
      throw new AuthenticationError('Error with authentication!');
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
