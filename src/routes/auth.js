const express = require('express');
const authController = require('../controllers/authController');
const validateAuth = require('../middlewares/validateAuth');
const validateMiddleware = require('../middlewares/validateMiddleware');
const commonErrorHandler = require('../middlewares/commonErrorHandler');

const router = express.Router();

/**
 * 로그인 토큰 발급 api
 * /api/auth/login
 */
router.post(
  '/login',
  validateAuth.loginRequestValidations,
  validateMiddleware,
  authController.login,
);

/**
 * 로그아웃 토큰 폐기 api
 * /api/auth/logout
 */
router.post('/logout', authController.logout);

/**
 * 토큰 재발급 api
 * /api/auth/refresh-token
 */
router.post(
  '/refreshToken',
  validateAuth.refreshTokenRequestValidations,
  validateMiddleware,
  authController.refreshToken,
);

router.use(commonErrorHandler);

module.exports = router;
