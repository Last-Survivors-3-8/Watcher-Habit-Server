const express = require('express');
const multer = require('multer');

const validateHabit = require('../middlewares/validateHabit');
const habitController = require('../controllers/habitController');
const validateMiddleware = require('../middlewares/validateMiddleware');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

/**
 * 습관 조회 api
 * /api/habit/:habitId
 */
router.get(
  '/:habitId',
  validateHabit.getRequest,
  verifyToken,
  validateMiddleware,
  habitController.getHabit,
);

/**
 * 기한별 습관 조회 api
 * /api/habit/periodic/:userId?startDate=:startDate&endDate=:endDate
 */
router.get(
  '/periodic/:userId',
  validateHabit.getPeriodicHabitsByUserIdRequest,
  verifyToken,
  validateMiddleware,
  habitController.getPeriodicHabitsByUserId,
);

/**
 * 습관 생성 api
 * /api/habit
 */
router.post(
  '/',
  validateHabit.postRequest,
  verifyToken,
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
  verifyToken,
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
  verifyToken,
  validateMiddleware,
  habitController.deleteHabit,
);

/**
 * 습관 지켜보기 등록 api
 * /api/habit/:habitId/watcher
 */
router.patch(
  '/:habitId/watcher',
  validateHabit.subscribeHabitRequest,
  verifyToken,
  validateMiddleware,
  habitController.subscribeWatcher,
);

/**
 * 습관 지켜보기 해제 api
 * /api/habit/:habitId/watcher/:watcherId
 */
router.delete(
  '/:habitId/watcher/:watcherId',
  validateHabit.unSubscribeHabitRequest,
  verifyToken,
  validateMiddleware,
  habitController.unSubscribeWatcher,
);

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  '/:habitId/image',
  upload.single('image'),
  validateHabit.getRequest,
  verifyToken,
  validateMiddleware,
  habitController.updateHabitImage,
);

router.use(commonErrorHandler);

module.exports = router;
