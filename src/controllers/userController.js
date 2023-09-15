const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const Habit = require('../models/Habit');
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
  const dailyHabitList = { nickname: [] };
  const currentDay = dateToDay(date);

  try {
    const user = await User.findOne({ nickname }).lean().exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    dailyHabitList.nickname = await Habit.find(
      {
        creator: user._id,
        doDay: { $in: [currentDay] },
        habitStartDate: { $lte: date },
        habitEndDate: { $gte: date },
      },
      '_id habitTitle startTime endTime',
    );

    return res.status(200).json({ data: dailyHabitList });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserCheck,
  getUserDailyHabitList,
};
