const { ERRORS } = require('../utils/ERRORS');

// router에 연결시 해당 라우터에서 던지는 모든 에러 처리하는 미들웨어
const commonErrorHandler = (err, req, res, next) => {
  // 요청으로 들어온 값 validation error 처리
  if (Array.isArray(err) && err[0].msg) {
    return res.status(400).json({ errors: err });
  }

  return res
    .status(err.status || ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE)
    .json({ error: err.message || ERRORS.INTERNAL_SERVER_ERROR.MESSAGE });
};

module.exports = commonErrorHandler;
