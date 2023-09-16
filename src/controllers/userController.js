const userService = require('../services/userService');
const { ERRORS } = require('../lib/ERRORS');
const User = require('../models/User');

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

module.exports = {
  getUser,
  getUserCheck,
};
