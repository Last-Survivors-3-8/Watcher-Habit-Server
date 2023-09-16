const jwt = require('jsonwebtoken');
const { ERRORS } = require('./ERRORS');

const getLoginUserId = (req) => {
  const token = req.cookies.accessToken;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(ERRORS.NEED_TOKEN);
  }
};

module.exports = getLoginUserId;
