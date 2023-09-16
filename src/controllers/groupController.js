const groupService = require('../services/groupService');

const getGroupDailyHabitList = async (req, res, next) => {
  try {
    const memberDailyHabits = await groupService.getMemberDailyHabits(req);

    return res.status(200).json({ data: memberDailyHabits });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getGroupDailyHabitList,
};
