const express = require('express');
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

router.use(commonErrorHandler);

module.exports = router;
