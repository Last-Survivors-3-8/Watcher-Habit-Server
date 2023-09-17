const express = require('express');
const multer = require('multer');

const validateHabit = require('../middlewares/validateHabit');
const habitController = require('../controllers/habitController');
const validateMiddleware = require('../middlewares/validateMiddleware');
const commonErrorHandler = require('../middlewares/commonErrorHandler');

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

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  '/:habitId/image',
  upload.single('image'),
  validateHabit.getRequest,
  validateMiddleware,
  habitController.updateHabitImage,
);

router.use(commonErrorHandler);

module.exports = router;
