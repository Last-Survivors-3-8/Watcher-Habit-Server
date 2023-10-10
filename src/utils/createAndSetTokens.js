const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAndSetTokens = async (user, res, tokenExpired = true) => {
  const userData = await User.findById(user._id);

  if (!userData) {
    throw new Error('User not found');
  }

  if (tokenExpired) {
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('refreshToken', refreshToken, {
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
    });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' },
  );

  res.cookie('accessToken', accessToken, {
    path: '/',
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: 'none',
    httpOnly: true,
  });

  return accessToken;
};

module.exports = createAndSetTokens;
