const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateNotification = require('../middlewares/validateNotification');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

/**
 * 알림 목록 조회 api
 */
router.get('/:userId', validateNotification.getListRequest, validateMiddleware);

/**
 * 알림 저장 api
 */
router.post('/', validateNotification.saveRequest, validateMiddleware);

/**
 * 알림 삭제 api
 */
router.delete(
  '/:notificationId',
  validateNotification.deleteRequest,
  validateMiddleware,
);

router.use(commonErrorHandler);

module.exports = router;
