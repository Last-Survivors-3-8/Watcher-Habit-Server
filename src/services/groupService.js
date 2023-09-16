const { ERRORS } = require('../lib/ERRORS');
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

  if (!group) {
    throw new Error(ERRORS.GROUP_NOT_FOUND);
  }

  const formattedData = {};

  await Promise.all(
    group.members.map(async ({ nickname }) => {
      const userDailyHabits = await userService.getUserDailyHabits(
        req,
        nickname,
        groupId,
      );

      formattedData[nickname] = userDailyHabits || {};
    }),
  );

  return formattedData;
};

module.exports = { getMemberDailyHabits };
