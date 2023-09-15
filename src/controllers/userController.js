const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const User = require('../models/User');
const userService = require('../services/userService');
const dateToDay = require('../utils/dateToDay');

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

const getUserDailyHabitList = async (req, res, next) => {
  const { date } = req.query;
  const { nickname } = req.params;
  const currentDay = dateToDay(date);

  try {
    const user = await User.findOne({ nickname })
      .populate({
        path: 'habits',
        match: {
          doDay: { $in: [currentDay] },
          habitStartDate: { $lte: date },
          habitEndDate: { $gte: date },
        },
        select: '_id habitTitle startTime endTime',
      })
      .lean()
      .exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    return res.status(200).json({ data: { nickname: user.habits } });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserCheck,
  getUserDailyHabitList,
};
