/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const createAndSetTokens = (user, res, oldRefreshToken = null) => {
  if (oldRefreshToken) {
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    if (decoded.userId !== user._id.toString()) {
      throw new Error('Invalid refreshToken');
    }
  } else {
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' },
  );

  return accessToken;
};

module.exports = createAndSetTokens;
