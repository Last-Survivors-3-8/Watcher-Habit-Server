const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const createAndSetTokens = require('../utils/createAndSetTokens');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

/**
 * 로그인 토큰 발급 api
 * /api/auth/login
 */
router.post('/login', validateMiddleware, async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const accessToken = createAndSetTokens(user, res);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

/**
 * 로그아웃 토큰 폐기 api
 * /api/auth/logout
 */
router.post('/logout', (_, res, next) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ message: '로그아웃 정상 처리되었습니다.' });
  } catch (error) {
    return next(error);
  }
});

/**
 * 토큰 재발급 api
 * /api/auth/refreshToken
 */
router.post('/refreshToken', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: 'Invalid or expired refresh token' });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '6h' },
    );

    return res.status(200).json({ accessToken });
  });
  return null;
});

router.use(commonErrorHandler);

module.exports = router;
