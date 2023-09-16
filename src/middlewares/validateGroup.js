const { param, query } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateGetGroupHabitList = [
  param('groupId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
  query('date')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(ERRORS.INVALID_HABIT_START_DATE_FORMAT),
];

module.exports = {
  validateGetGroupHabitList,
};
