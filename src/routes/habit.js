const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateHabit = require('../middlewares/validateHabit');
const habitController = require('../controllers/habitController');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

/**
 * 습관 조회 api
 * /api/habit/:habitId
 */
router.get(
  '/:habitId',
  validateHabit.getRequest,
  validateMiddleware,
  habitController.getHabit,
);

/**
 * 습관 생성 api
 * /api/habit
 */
router.post(
  '/',
  validateHabit.postRequest,
  validateMiddleware,
  habitController.createHabit,
);

/**
 * 습관 수정 api
 * /api/habit/:habitId
 */
router.patch(
  '/:habitId',
  validateHabit.patchRequest,
  validateMiddleware,
  habitController.updateHabit,
);

/**
 * 습관 삭제 api
 * /api/habit/:habitId
 */
router.delete(
  '/:habitId',
  validateHabit.deleteRequest,
  validateMiddleware,
  habitController.deleteHabit,
);

router.use(commonErrorHandler);

module.exports = router;
