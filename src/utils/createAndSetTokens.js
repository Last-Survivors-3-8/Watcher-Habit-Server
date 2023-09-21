const jwt = require('jsonwebtoken');

const createAndSetTokens = (user, res, tokenExpired = true) => {
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
    { expiresIn: '6h' },
  );

  return accessToken;
};

module.exports = createAndSetTokens;
