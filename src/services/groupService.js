const Group = require('../models/Group');
const userService = require('./userService');

const getMemberDailyHabits = async (req) => {
  const { groupId } = req.params;

  const group = await Group.findOne({ _id: groupId })
    .populate({
      path: 'members',
      select: 'nickname',
    })
    .lean()
    .exec();

  const memberDailyHabits = await Promise.all(
    group.members.map(async ({ nickname }) => {
      const userDailyHabits = await userService.getUserDailyHabits(
        req,
        nickname,
      );
      return { [nickname]: userDailyHabits };
    }),
  );

  const formattedDate = memberDailyHabits.reduce((acc, habit) => {
    const [nickname] = Object.keys(habit);
    acc[nickname] = habit[nickname];
    return acc;
  }, {});

  return formattedDate;
};

module.exports = { getMemberDailyHabits };
