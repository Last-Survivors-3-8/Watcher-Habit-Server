const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { ERRORS } = require('../utils/ERRORS');
const {
  validateGetUser,
  validateCreateUser,
} = require('../middlewares/validateUser');
const commonErrorHandler = require('../middlewares/commonErrorHandler');

const router = express.Router();

/**
 * 유저 조회 api
 * /api/user/:userId
 */
router.get('/:userId', validateGetUser, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(errors.array());
  }

  const { userId } = req.params;

  try {
    const user = await User.findById(userId).lean().exec();

    if (!user) {
      return res
        .status(ERRORS.USER_NOT_FOUND.STATUS_CODE)
        .json({ error: ERRORS.USER_NOT_FOUND.MESSAGE });
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
});

/**
 * 유저 생성 api
 * /api/user
 */
router.post('/', validateCreateUser, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(errors.array());
  }

  try {
    const duplicateNickName = await User.exists({
      nickName: req.body.nickName,
    });

    if (duplicateNickName) {
      const err = new Error(ERRORS.DUPLICATE_NICKNAME.MESSAGE);
      err.status = ERRORS.DUPLICATE_NICKNAME.STATUS_CODE;
      return next(err);
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
});

router.use(commonErrorHandler);

module.exports = router;
