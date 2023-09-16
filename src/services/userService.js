const User = require('../models/User');
const dateToDay = require('../utils/dateToDay');

const getNicknameByEmail = (email) =>
  User.findOne({ email }, 'nickname').lean().exec();

const getUserDailyHabits = async (req, nickname, sharedGroup = null) => {
  const { date } = req.query;
  const currentDay = dateToDay(date);
  const matchConditions = {
    doDay: { $in: [currentDay] },
    habitStartDate: { $lte: date },
    habitEndDate: { $gte: date },
  };

  if (sharedGroup) {
    matchConditions.sharedGroup = sharedGroup;
  }

  const user = await User.findOne({ nickname })
    .populate({
      path: 'habits',
      match: matchConditions,
      select: '_id habitTitle startTime endTime',
    })
    .lean()
    .exec();

  return user ? user.habits : [];
};

module.exports = { getNicknameByEmail, getUserDailyHabits };
