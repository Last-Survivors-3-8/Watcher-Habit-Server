const jwt = require('jsonwebtoken');
const createAndSetTokens = require('./createAndSetTokens');
const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');

const verifyToken = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return handleError(res, ERRORS.ACCESS_TOKEN_REQUIRED);
    }

    const decoded = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return handleError(res, ERRORS.REFRESH_TOKEN_REQUIRED);
      }

      let decoded;

      try {
        decoded = await jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );
      } catch (err) {
        return handleError(res, ERRORS.INVALID_OR_EXPIRED_REFRESH_TOKEN);
      }

      try {
        await createAndSetTokens(decoded.userId, res, false);
        return next();
      } catch (err) {
        return handleError(res, ERRORS.FAILED_TO_REFRESH_ACCESS_TOKEN);
      }
    } else {
      return handleError(res, ERRORS.INVALID_OR_EXPIRED_TOKEN);
    }
  }
};

module.exports = verifyToken;
