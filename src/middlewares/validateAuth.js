const { check } = require('express-validator');
const { ERRORS } = require('../lib/ERRORS');

const validateLogout = [
  check('refreshToken').exists().withMessage(ERRORS.NEED_TOKEN),
];

module.exports = {
  validateLogout,
};
