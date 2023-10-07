const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAndSetTokens = async (user, res, tokenExpired = true) => {
  const userData = await User.findById(user._id);

  if (!userData) {
    throw new Error('User not found');
  }

  const tokens = {};

  if (tokenExpired) {
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie(
      'refreshToken',
      refreshToken,
      { path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 },
      // {
      //   httpOnly: true,
      //   secure: true,

      //   SameSite: 'None',
      // }
    );
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' },
  );

  tokens.accessToken = {
    value: accessToken,
    options: {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 1000,
    },
  };

  return tokens;
};

module.exports = createAndSetTokens;
