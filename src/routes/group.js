const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateGroup = require('../middlewares/validateGroup');
const validateMiddleware = require('../middlewares/validateMiddleware');
const groupController = require('../controllers/groupController');
const connections = require('../utils/sseConnections');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/events', (req, res) => {
  const { userId } = req.query;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  if (userId) {
    connections[userId] = res;
  }

  req.on('close', () => {
    if (userId) {
      delete connections[userId];
    } else {
      connections.splice(connections.indexOf(res), 1);
    }
  });
});

/**
 * 그룹 생성 API
 * api/group
 */
router.post(
  '/',
  validateGroup.validateCreation,
  verifyToken,
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
  verifyToken,
  validateMiddleware,
  groupController.getGroup,
);

/**
 * 그룹 멤버 추가 API
 * api/group/:groupId/members
 */
router.patch(
  '/:groupId/members',
  validateGroup.addMemberValidation,
  verifyToken,
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
  verifyToken,
  validateMiddleware,
  groupController.getGroupDailyHabitList,
);

/**
 * 그룹 멤버 초대 API
 * api/group/:groupId/invite
 */
router.post(
  '/:groupId/invite',
  validateGroup.inviteMemberValidation,
  verifyToken,
  validateMiddleware,
  groupController.inviteMember,
);

router.use(commonErrorHandler);

module.exports = router;
