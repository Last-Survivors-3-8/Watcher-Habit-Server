const { param, check } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateGetUser = [
  param('userId').isMongoId().withMessage(ERRORS.INVALID_MONGO_ID.MESSAGE),
];

const validateCreateUser = [
  check('nickName')
    .exists()
    .withMessage(ERRORS.NICKNAME_REQUIRED)
    .isAlphanumeric()
    .withMessage(ERRORS.NICKNAME_NO_BLANK_CONTAINED),
  check('email')
    .exists()
    .withMessage(ERRORS.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERRORS.EMAIL_INVALID),
  check('password').custom((value, { req }) => {
    if (req.body.socialLoginType === 'none' && !value) {
      throw new Error(ERRORS.PASSWORD_REQUIRED.MESSAGE);
    }

    return true;
  }),
  check('socialLoginType')
    .exists()
    .withMessage(ERRORS.SOCIAL_LOGIN_TYPE_REQUIRED)
    .isIn(['none', 'facebook', 'google', 'twitter'])
    .withMessage(ERRORS.SOCIAL_LOGIN_TYPE_INCORRECT),
];

const validateGetUserCheck = [
  check('email')
    .exists()
    .withMessage(ERRORS.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERRORS.EMAIL_INVALID),
];

module.exports = { validateGetUser, validateCreateUser, validateGetUserCheck };
