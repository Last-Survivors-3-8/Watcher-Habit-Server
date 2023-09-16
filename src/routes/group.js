const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateGroup = require('../middlewares/validateGroup');
const validateMiddleware = require('../middlewares/validateMiddleware');
const groupController = require('../controllers/groupController');

const router = express.Router();

/**
 * 그룹별 일간 습관 목록 조회 API
 * api/group/:groupId/habitList?date=:date
 */
router.get(
  '/:groupId/habitList',
  validateGroup.validateGetGroupHabitList,
  validateMiddleware,
  groupController.getGroupDailyHabitList,
);

router.use(commonErrorHandler);

module.exports = router;
