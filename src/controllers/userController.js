const User = require('../models/User');
const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const userService = require('../services/userService');

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
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    if (!withUserData) {
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
      return handleError(res, ERRORS.DUPLICATE_NICKNAME);
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

const getUserDailyHabitList = async (req, res, next) => {
  const { nickname } = req.params;

  try {
    const userDailyHabits = await userService.getUserDailyHabits(req, nickname);

    if (!userDailyHabits) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    return res.status(200).json({ data: { [nickname]: userDailyHabits } });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserCheck,
  getUser,
  postUser,
  getUserDailyHabitList,
};
