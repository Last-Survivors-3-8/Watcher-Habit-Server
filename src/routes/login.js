const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const createAndSetTokens = require('../utils/createAndSetTokens');
const ERRORS = require('../utils/ERRORS');
const handleError = require('../utils/handleError');

const router = express.Router();

/**
 * 로그인 토큰 발급 api
 * /api/login
 */
router.post('/', async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(errors.array());
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const accessToken = createAndSetTokens(user, res);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
