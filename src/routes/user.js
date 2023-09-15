const express = require('express');
const User = require('../models/User');
const { ERRORS } = require('../lib/ERRORS');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const validateUser = require('../middlewares/validateUser');
const validateMiddleware = require('../middlewares/validateMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * 유저 가입 확인 api
 * api/user/check?email=:email
 */
router.get(
  '/check',
  validateUser.validateGetUserCheck,
  validateMiddleware,
  userController.getUserCheck,
);

/**
 * 유저 조회 api
 * /api/user/:userId
 */
router.get(
  '/:userId',
  validateUser.validateGetUser,
  validateMiddleware,
  async (req, res, next) => {
    const { userId } = req.params;
    const { include, withUserData } = req.query;

    try {
      const baseQuery = User.findById(userId).lean();

      switch (include) {
        case 'group':
          baseQuery.populate('groups');
          break;
        case 'habit':
          baseQuery.populate('habits');
          break;
        default:
          break;
      }

      const user = await baseQuery.exec();

      if (!user) {
        return res
          .status(ERRORS.USER_NOT_FOUND.STATUS_CODE)
          .json({ error: ERRORS.USER_NOT_FOUND.MESSAGE });
      }

      if (withUserData === 'false') {
        return res
          .status(200)
          .json(include === 'group' ? user.groups : user.habits);
      }

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
);

/**
 * 유저 생성 api
 * /api/user
 */
router.post(
  '/',
  validateUser.validateCreateUser,
  validateMiddleware,
  async (req, res, next) => {
    try {
      const duplicateNickname = await User.exists({
        nickname: req.body.nickname,
      });

      if (duplicateNickname) {
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
  },
);

router.use(commonErrorHandler);

module.exports = router;
