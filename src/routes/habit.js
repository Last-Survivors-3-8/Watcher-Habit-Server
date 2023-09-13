const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const {
  validateGetHabit,
  validateCreateHabit,
  validateUpdateHabit,
  validateDeleteHabit,
} = require('../middlewares/validateHabit');
const {
  getHabit,
  createHabit,
  updateHaibt,
  deleteHabit,
} = require('../controllers/habitController');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

/**
 * 습관 조회 api
 * /api/habit/:habitId
 */
router.get('/:habitId', validateGetHabit, validateMiddleware, getHabit);

/**
 * 습관 생성 api
 * /api/habit
 */
router.post('/', validateCreateHabit, validateMiddleware, createHabit);

/**
 * 습관 수정 api
 * /api/habit/:habitId
 */
router.patch('/:habitId', validateUpdateHabit, validateMiddleware, updateHaibt);

/**
 * 습관 삭제 api
 * /api/habit/:habitId
 */
router.delete(
  '/:habitId',
  validateDeleteHabit,
  validateMiddleware,
  deleteHabit,
);

router.use(commonErrorHandler);

module.exports = router;
