const Group = require('../models/Group');
const groupService = require('../services/groupService');
const handleError = require('../lib/handleError');
const { ERRORS } = require('../lib/ERRORS');

const generateGroup = async (req, res, next) => {
  const { groupName, invitationCode } = req.body;

  try {
    const hasGroup = await Group.exists({ groupName }).lean().exec();
    if (hasGroup) {
      return handleError(res, ERRORS.GROUP_ALREADY_EXISTS);
    }
    // invitationCode 생성? 받아오기?

    // members 에 요청한 멤버 추가 -> access token을 받아와서 유저id를 알아야 할 것 같음

    const newGroupColums = {
      groupName,
      invitationCode,
    };

    const newGroup = new Group(newGroupColums);
    await newGroup.save();

    return res.status(201).json({ newGroup });
  } catch (error) {
    return next(error);
  }
};

const getGroup = async (req, res, next) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).lean().exec();

    return res.status(200).json({ group });
  } catch (error) {
    return next(error);
  }
};

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
  getGroup,
  generateGroup,
};
