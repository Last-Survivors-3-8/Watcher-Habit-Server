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
 * 기한별 습관 조회 api
 * /api/habit/periodic/:userId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
router.get(
  '/periodic/:userId',
  validateHabit.getPeriodicHabitsByUserIdRequest,
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

/**
 * 습관 지켜보기 등록 api
 * /api/habit/:habitId/watcher
 */
router.patch(
  '/:habitId/watcher',
  validateHabit.subscribeHabitRequest,
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
  validateMiddleware,
  habitController.unSubscribeWatcher,
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
