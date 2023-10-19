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
  verifyToken,
  validateHabit.getRequest,
  validateMiddleware,
  habitController.getHabit,
);

/**
 * 기한별 습관 조회 api
 * /api/habit/periodic/:userId?startDate=:startDate&endDate=:endDate
 */
router.get(
  '/periodic/:userId',
  verifyToken,
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
  verifyToken,
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
  verifyToken,
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
  verifyToken,
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
  verifyToken,
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
  verifyToken,
  validateHabit.unSubscribeHabitRequest,
  validateMiddleware,
  habitController.unSubscribeWatcher,
);

/**
 * 이미지 업로드 api
 * /api/habit/:habitId/image
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.post(
  '/:habitId/image',
  upload.single('image'),
  verifyToken,
  validateHabit.getRequest,
  validateMiddleware,
  habitController.updateHabitImage,
);

router.use(commonErrorHandler);

module.exports = router;
