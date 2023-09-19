const { param, query, body } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateInvitation = [
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

module.exports = {
  validateGetGroupHabitList,
  validateGroupId,
  validateMemberId,
  validateInvitation,
};
