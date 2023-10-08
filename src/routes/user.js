const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateUser = require('../middlewares/validateUser');
const validateMiddleware = require('../middlewares/validateMiddleware');
const userController = require('../controllers/userController');
const verifyToken = require('../utils/verifyToken');

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
 * 유저 이메일 검색 조회 API
 * api/user/getInfoByEmail?email=:email
 */
router.get(
  '/getInfoByEmail',
  validateUser.validateGetUserCheck,
  validateMiddleware,
  userController.getUserInfoByEmail,
);

/**
 * 유저 조회 api
 * /api/user/:userId
 */
router.get(
  '/:userId',
  validateUser.validateGetUser,
  verifyToken,
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

/**
 * 유저별 일간 습관 목록 조회 API
 * api/user/:nickname/habitList?date=:date
 */
router.get(
  '/:nickname/habitList',
  validateUser.validateGetUserHabitList,
  verifyToken,
  validateMiddleware,
  userController.getUserDailyHabitList,
);

router.use(commonErrorHandler);

module.exports = router;
