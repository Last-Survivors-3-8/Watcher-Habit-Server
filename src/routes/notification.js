const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateNotification = require('../middlewares/validateNotification');
const validateMiddleware = require('../middlewares/validateMiddleware');
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

/**
 * 알림 목록 조회 api
 * api/notification/:userId
 */
router.get(
  '/:userId',
  validateNotification.getListRequest,
  verifyToken,
  validateMiddleware,
  notificationController.getList,
);

/**
 * 알림 저장 api
 * api/notification
 */
router.post(
  '/',
  validateNotification.saveRequest,
  verifyToken,
  validateMiddleware,
  notificationController.save,
);

router.use(commonErrorHandler);

module.exports = router;
