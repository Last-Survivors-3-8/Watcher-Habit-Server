const mongoose = require('mongoose');
const Habit = require('../models/Habit');
const User = require('../models/User');
const Group = require('../models/Group');
const sendNotificationsForStatus = require('../lib/realTimeNotifications/sendNotificationsForStatus');

const getHabitById = (habitId) =>
  Habit.findById(habitId)
    .populate({
      path: 'creator',
      select: '_id nickname',
    })
    .populate({
      path: 'approvals._id',
      select: 'profileImageUrl',
    })
    .populate({
      path: 'sharedGroup',
      select: 'groupName',
    })
    .lean()
    .exec();

const getHabitsByDateRange = async (userId, startDate, endDate) =>
  Habit.find({
    creator: userId,
    habitStartDate: { $lte: endDate },
    habitEndDate: { $gte: startDate },
  })
    .select('doDay habitTitle startTime endTime habitStartDate habitEndDate')
    .lean()
    .exec();

const checkUserExists = (userId) => User.exists({ _id: userId });

const checkForDuplicateHabitTime = (conditions) =>
  Habit.findOne(conditions).lean().exec();

const checkGroupExists = (groupId) => Group.exists({ _id: groupId });

const createNewHabit = async (habitData) => {
  const habit = new Habit(habitData);
  const { creator: userId, sharedGroup: groupId } = habitData;

  await habit.save();

  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { habits: habit._id } },
  );

  if (groupId) {
    await Group.findOneAndUpdate(
      { _id: groupId },
      { $push: { habits: habit._id } },
    );
  }

  return habit;
};

const updateExistingHabit = async (habitId, fields) => {
  const updatedFields = { ...fields };

  if (updatedFields.approvalStatus && updatedFields.approvalId) {
    await Habit.updateOne(
      {
        _id: habitId,
        'approvals._id': new mongoose.Types.ObjectId(updatedFields.approvalId),
      },
      { $set: { 'approvals.$.status': updatedFields.approvalStatus } },
    );

    delete updatedFields.approvalStatus;
    delete updatedFields.approvalId;
  }

  return Habit.findByIdAndUpdate(habitId, updatedFields, { new: true })
    .lean()
    .exec();
};

const deleteHabitById = async (habitId) => {
  const { creator: userId, sharedGroup: groupId } = await getHabitById(habitId);

  const result = await Habit.findByIdAndDelete(habitId).exec();

  const objectHabitId = new mongoose.Types.ObjectId(habitId);

  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { habits: objectHabitId } },
  );

  if (groupId) {
    await Group.findOneAndUpdate(
      { _id: groupId },
      { $pull: { habits: objectHabitId } },
    );
  }

  return result;
};

const updateHabitImageUrl = async (habitId, imageUrl) => {
  const habit = await getHabitById(habitId);
  const updateValues = {
    habitImage: imageUrl,
    status: 'awaitingApproval',
  };

  if (habit.approvals.length === 0) {
    updateValues.status = 'approvalSuccess';
  }

  const result = await Habit.findByIdAndUpdate(habitId, updateValues);
  const newStatus = updateValues.status === 'awaitingApproval' ? 'awaitingApproval' ? 'approvalSuccess';

  sendNotificationsForStatus(habit, newStatus);

  return result;
};

module.exports = {
  getHabitById,
  getHabitsByDateRange,
  checkUserExists,
  checkForDuplicateHabitTime,
  checkGroupExists,
  createNewHabit,
  updateExistingHabit,
  deleteHabitById,
  updateHabitImageUrl,
};
