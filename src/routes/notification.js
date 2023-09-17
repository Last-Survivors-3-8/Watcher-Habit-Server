const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateNotification = require('../middlewares/validateNotification');
const validateMiddleware = require('../middlewares/validateMiddleware');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

/**
 * 알림 목록 조회 api
 */
router.get(
  '/:userId',
  validateNotification.getListRequest,
  validateMiddleware,
  notificationController.getList,
);

/**
 * 알림 저장 api
 */
router.post(
  '/',
  validateNotification.saveRequest,
  validateMiddleware,
  notificationController.save,
);

router.use(commonErrorHandler);

module.exports = router;
