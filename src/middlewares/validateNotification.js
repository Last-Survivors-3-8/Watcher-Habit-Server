const { param, check } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const getListRequest = [
  param('userId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
];

const saveRequest = [
  check('content')
    .exists()
    .withMessage(ERRORS.INVALID_CONTENT.MESSAGE)
    .custom((value) => {
      const pattern = /^[^\s]+님이 [^\s]+에 초대했습니다$/;
      return pattern.test(value);
    })
    .withMessage(ERRORS.INVALID_CONTENT.MESSAGE),
  check('from')
    .exists()
    .withMessage(ERRORS.NO_USER_PROVIDED)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
  check('to')
    .exists()
    .withMessage(ERRORS.NO_USER_PROVIDED)
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
  check('status')
    .exists()
    .withMessage(ERRORS.NO_STATUS)
    .isIn(['invite'])
    .withMessage(ERRORS.NO_STATUS),
];

const deleteRequest = [
  param('notificationId')
    .isMongoId()
    .withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
];

module.exports = {
  getListRequest,
  saveRequest,
  deleteRequest,
};
