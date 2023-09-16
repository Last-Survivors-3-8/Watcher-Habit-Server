const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateUser = require('../middlewares/validateUser');
const validateMiddleware = require('../middlewares/validateMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * 유저 가입 확인 api
 * api/user/check?email=:email
 */
router.get(
  '/check',
  validateUser.validateGetUserCheck,
  validateMiddleware,
  userController.getUserCheck,
);

/**
 * 유저 조회 api
 * /api/user/:userId
 */
router.get(
  '/:userId',
  validateUser.validateGetUser,
  validateMiddleware,
  userController.getUser,
);

/**
 * 유저 생성 api
 * /api/user
 */
router.post(
  '/',
  validateUser.validateCreateUser,
  validateMiddleware,
  userController.postUser,
);

router.use(commonErrorHandler);

module.exports = router;
