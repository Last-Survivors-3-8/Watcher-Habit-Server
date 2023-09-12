const express = require('express');
const User = require('../models/User');
const { ERRORS } = require('../utils/ERRORS');
const handleError = require('../utils/handleError');

const router = express.Router();

/**
 * 이메일 체크 api
 * /api/userCheck
 */
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ user });
    }

    return res.status(200).json({
      exists: false,
    });
  } catch (error) {
    return handleError(res, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
