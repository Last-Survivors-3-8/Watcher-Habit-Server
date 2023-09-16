const userService = require('../services/userService');
const { ERRORS } = require('../lib/ERRORS');
const User = require('../models/User');

const getUserCheck = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await userService.getNicknameByEmail(email);

    if (user) {
      return res.status(200).json({ nickname: user.nickname });
    }

    return res.status(200).json({
      exists: false,
    });
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
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
};

const postUser = async (req, res, next) => {
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
};

module.exports = {
  getUserCheck,
  getUser,
  postUser,
};
