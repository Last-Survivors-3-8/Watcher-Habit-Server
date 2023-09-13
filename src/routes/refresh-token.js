const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERRORS } = require('../utils/ERRORS');
const handleError = require('../utils/handleError');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return handleError(res, ERRORS.REFRESH_TOKEN_NOT_PROVIDED);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).lean().exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' },
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return handleError(res, ERRORS.REFRESH_TOKEN_EXPIRED);
    }

    return next(error);
  }
});

module.exports = router;
