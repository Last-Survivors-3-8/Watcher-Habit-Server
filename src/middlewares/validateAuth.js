const { body } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const isValidEmail = (isRequired = true) =>
  body('email')
    .optional(!isRequired)
    .isEmail()
    .withMessage(ERRORS.INVALID_EMAIL);

const isValidRefreshToken = () =>
  body('refreshToken').isString().withMessage(ERRORS.INVALID_REFRESH_TOKEN);

const loginRequestValidations = [isValidEmail()];

const refreshTokenRequestValidations = [isValidRefreshToken()];

module.exports = {
  loginRequestValidations,
  refreshTokenRequestValidations,
};
