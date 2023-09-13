const jwt = require('jsonwebtoken');

const createAndSetTokens = (user, res, shouldCreateRefreshToken = true) => {
  if (shouldCreateRefreshToken) {
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
