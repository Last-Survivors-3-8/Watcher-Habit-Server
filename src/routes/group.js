const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateGroup = require('../middlewares/validateGroup');
const validateMiddleware = require('../middlewares/validateMiddleware');
const groupController = require('../controllers/groupController');

const router = express.Router();

/**
 * 그룹 생성 API
 * api/group
 */
router.post(
  '/',
  validateGroup.validateCreation,
  validateMiddleware,
  groupController.generateGroup,
);

/**
 * 그룹 조회 API
 * api/group/:groupId
 */
router.get(
  '/:groupId',
  validateGroup.validateGroupId,
  validateMiddleware,
  groupController.getGroup,
);

/**
 * 그룹 멤버 추가 API
 * api/group/:groupId/members
 */
router.patch(
  '/:groupId/members',
  validateGroup.validateGroupId,
  validateGroup.validateMemberId,
  validateMiddleware,
  groupController.addMember,
);

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

/**
 * 그룹 멤버 초대 API
 * api/group/:groupId/invite
 */
router.post(
  '/:groupId/invite',
  validateGroup.validateGroupId,
  validateGroup.validateInviteMemberId,
  validateMiddleware,
  groupController.inviteMember,
);

router.use(commonErrorHandler);

module.exports = router;
