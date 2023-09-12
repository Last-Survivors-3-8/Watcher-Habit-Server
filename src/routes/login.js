/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERRORS } = require('../utils/ERRORS');

function createAndSetTokens(user, res) {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );
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

  return accessToken;
}

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error(ERRORS.UNAUTHORIZED.MESSAGE);
      err.status = ERRORS.UNAUTHORIZED.STATUS_CODE;
      return next(err);
    }

    const accessToken = createAndSetTokens(user, res);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
