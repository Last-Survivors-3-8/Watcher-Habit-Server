const Group = require('../models/Group');
const groupService = require('../services/groupService');
const handleError = require('../lib/handleError');
const { ERRORS } = require('../lib/ERRORS');
const User = require('../models/User');

const generateGroup = async (req, res, next) => {
  const { groupName, creatorId } = req.body;

  try {
    const alreadyHasGroup = await Group.exists({ groupName }).exec();

    if (alreadyHasGroup) {
      return handleError(res, ERRORS.GROUP_ALREADY_EXISTS);
    }

    const user = await User.findById(creatorId).exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const newGroupColums = {
      groupName,
      members: [creatorId],
    };

    const newGroup = new Group(newGroupColums);
    await newGroup.save();

    user.groups.push(newGroup._id);
    await user.save();

    return res.status(201).json({ newGroup });
  } catch (error) {
    return next(error);
  }
};

const getGroup = async (req, res, next) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).lean().exec();

    if (!group) {
      return handleError(res, ERRORS.GROUP_NOT_FOUND);
    }

    return res.status(200).json({ group });
  } catch (error) {
    return next(error);
  }
};

const addMember = async (req, res, next) => {
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
  addMember,
  generateGroup,
};
