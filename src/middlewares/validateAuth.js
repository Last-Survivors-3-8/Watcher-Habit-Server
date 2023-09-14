const { param, check } = require('express-validator');
const { ERRORS } = require('../utils/ERRORS');

const validateLogout = [
  check('refreshToken').exists().withMessage(ERRORS.NEED_TOKEN),
];

module.exports = {
  validateLogout,
};
