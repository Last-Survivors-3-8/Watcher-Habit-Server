const { check } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateEmail = [
  check('email')
    .exists()
    .withMessage(ERRORS.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERRORS.EMAIL_INVALID),
];

module.exports = { validateEmail };
