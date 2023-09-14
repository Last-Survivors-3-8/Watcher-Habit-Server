const createError = require('http-errors');
const { ERRORS } = require('../lib/ERRORS');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res) => {
    const statusCode = err.status || ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE;
    const message = err.message || ERRORS.INTERNAL_SERVER_ERROR.MESSAGE;

    res.status(statusCode).json({ error: message });
  });
};
