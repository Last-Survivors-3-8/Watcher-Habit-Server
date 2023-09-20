const { param, query, body } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const isGroupId = (isRequired = true) =>
  param('groupId')
    .optional(!isRequired)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE);

const isGroupName = (isRequired = true) =>
  body('groupName')
    .optional(!isRequired)
    .isString()
    .isLength({ min: 2, max: 15 })
    .withMessage(ERRORS.INVALID_GROUP_NAME.MESSAGE);

const isUserId = (field, isRequired = true) =>
  body(field)
    .optional(!isRequired)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE);

const isDate = (isRequired = true) =>
  query('date')
    .optional(!isRequired)
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(ERRORS.INVALID_HABIT_START_DATE_FORMAT);

const validateCreation = [isGroupName()];

const validateGroupId = [isGroupId()];

const validateMemberId = [isUserId('userId')];

const validateGetGroupHabitList = [isGroupId(), isDate(false)];

const validateInviteMemberId = [isUserId('fromUserId'), isUserId('toUserId')];

const addMemberValidation = [isGroupId(), isUserId('userId')];

const inviteMemberValidation = [isGroupId(), ...validateInviteMemberId];

module.exports = {
  validateGetGroupHabitList,
  validateGroupId,
  validateMemberId,
  validateCreation,
  validateInviteMemberId,
  addMemberValidation,
  inviteMemberValidation,
};
