const { body, param } = require('express-validator');
const { ERRORS } = require('../utils/ERRORS');

const isHabitId = () =>
  param('habitId').isMongoId().withMessage(ERRORS.INVALID_HABIT_ID);

const isHabitTitle = (isRequired = true) =>
  body('habitTitle')
    .optional(!isRequired)
    .isString()
    .withMessage(ERRORS.HABIT_TITLE_STRING)
    .isLength({ min: 2, max: 10 })
    .withMessage(ERRORS.HABIT_TITLE_LENGTH);

const isHabitContent = (isRequired = true) =>
  body('habitContent')
    .optional(!isRequired)
    .isString()
    .withMessage(ERRORS.HABIT_CONTENT_STRING)
    .isLength({ min: 2, max: 100 })
    .withMessage(ERRORS.HABIT_CONTENT_LENGTH);

const isHabitStartDate = (isRequired = true) =>
  body('habitStartDate')
    .optional(!isRequired)
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(ERRORS.INVALID_HABIT_START_DATE_FORMAT);

const ishabitEndDate = (isRequired = true) =>
  body('habitEndDate')
    .optional(!isRequired)
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(ERRORS.INVALID_HABIT_END_DATE_FORMAT)
    .custom((value, { req }) => {
      if (value < req.body.habitStartDate) {
        throw new Error(ERRORS.HABIT_END_DATE_BEFORE_START);
      }
      return true;
    });

const isDoDay = (isRequired = true) =>
  body('doDay')
    .optional(!isRequired)
    .isIn(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])
    .withMessage(ERRORS.INVALID_DO_DAY);

const isStartTime = (isRequired = true) =>
  body('startTime')
    .optional(!isRequired)
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage(ERRORS.INVALID_START_TIME_FORMAT);

const isEndTime = (isRequired = true) =>
  body('endTime')
    .optional(!isRequired)
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage(ERRORS.INVALID_END_TIME_FORMAT);

const isPenalty = (isRequired = true) =>
  body('penalty')
    .optional(!isRequired)
    .isString()
    .withMessage(ERRORS.PENALTY_STRING)
    .isLength({ min: 2, max: 50 })
    .withMessage(ERRORS.PENALTY_LENGTH);

const isCreator = (isRequired = true) =>
  body('creator')
    .optional(!isRequired)
    .isMongoId()
    .withMessage(ERRORS.INVALID_CREATOR_ID);

const isSharedGroup = (isRequired = true) =>
  body('sharedGroup')
    .optional(!isRequired)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE);

const isApprovals = (isRequired = true) =>
  body('approvals.*.userId')
    .optional(!isRequired)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE);

const isStatus = (isRequired = true) =>
  body('status')
    .optional(!isRequired)
    .isIn([
      'notTimeYet',
      'inProgress',
      'awaitingApproval',
      'awaitingVerification',
      'approvalSuccess',
      'expiredFailure',
      'approvalFailure',
    ])
    .withMessage(ERRORS.NO_STATUS);

const getRequest = [isHabitId()];

const postRequest = [
  isHabitTitle(),
  isHabitContent(),
  isHabitStartDate(false),
  ishabitEndDate(false),
  isDoDay(),
  isStartTime(),
  isEndTime(),
  isPenalty(false),
  isCreator(),
  isSharedGroup(false),
  isStatus(false),
];

const patchRequest = [
  isHabitId(),
  isHabitTitle(false),
  isHabitContent(false),
  isHabitStartDate(false),
  ishabitEndDate(false),
  isDoDay(false),
  isStartTime(false),
  isEndTime(false),
  isPenalty(false),
  isSharedGroup(false),
  isApprovals(false),
  isStatus(false),
];

const deleteRequest = [isHabitId()];

module.exports = {
  postRequest,
  deleteRequest,
  getRequest,
  patchRequest,
};
