const { param, query, body } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateCreation = [
  body('groupName')
    .isString()
    .isLength({ min: 2, max: 15 })
    .withMessage(ERRORS.INVALID_GROUP_NAME.MESSAGE),
];

const validateGroupId = [
  param('groupId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID),
];

const validateMemberId = [
  body('userId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID),
];

const validateGetGroupHabitList = [
  param('groupId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
  query('date')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(ERRORS.INVALID_HABIT_START_DATE_FORMAT),
];

const validateInviteMemberId = [
  body('fromUserId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID),
  body('toUserId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID),
];

module.exports = {
  validateGetGroupHabitList,
  validateGroupId,
  validateMemberId,
  validateCreation,
  validateInviteMemberId,
};
