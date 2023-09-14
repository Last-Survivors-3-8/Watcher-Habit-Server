const jwt = require('jsonwebtoken');
const { ERRORS } = require('../utils/ERRORS');
const handleError = require('../utils/handleError');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return handleError(res, ERRORS.NO_TOKEN_PROVIDED);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return handleError(res, ERRORS.TOKEN_INVALID_OR_EXPIRED);
    }

    req.userId = decoded.userId;

    next();

    return null;
  });

  return null;
};

module.exports = verifyToken;
