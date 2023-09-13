const { ERRORS } = require('../utils/ERRORS');

const commonErrorHandler = (err, req, res, next) => {
  if (Array.isArray(err) && err[0].msg) {
    return res.status(400).json({ errors: err });
  }

  return res
    .status(err.status || ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE)
    .json({ error: err.message || ERRORS.INTERNAL_SERVER_ERROR.MESSAGE });
};

module.exports = commonErrorHandler;
