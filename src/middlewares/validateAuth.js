const { body, cookie } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const isValidEmail = (isRequired = true) =>
  body('email')
    .optional(!isRequired)
    .isEmail()
    .withMessage(ERRORS.INVALID_EMAIL);

const isValidRefreshTokenInCookie = () =>
  cookie('refreshToken').exists().withMessage(ERRORS.INVALID_REFRESH_TOKEN);

const loginRequestValidations = [isValidEmail()];

const refreshTokenRequestValidations = [isValidRefreshTokenInCookie()];

module.exports = {
  loginRequestValidations,
  refreshTokenRequestValidations,
};
