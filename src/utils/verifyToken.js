const jwt = require('jsonwebtoken');
const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');

const verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return handleError(res, ERRORS.ACCESS_TOKEN_REQUIRED);
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return handleError(res, ERRORS.INVALID_OR_EXPIRED_TOKEN);
  }
};

module.exports = verifyToken;
