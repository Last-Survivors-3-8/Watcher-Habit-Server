const mongoose = require('mongoose');
const Habit = require('../models/Habit');
const User = require('../models/User');
const Group = require('../models/Group');

const getHabitById = (habitId) =>
  Habit.findById(habitId)
    .populate({
      path: 'creator',
      select: '_id nickname',
    })
    .populate({
      path: 'approvals.userId',
      select: 'profileImageUrl',
    })
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

const updateExistingHabit = (habitId, updatedFields) =>
  Habit.findByIdAndUpdate(habitId, updatedFields, { new: true }).lean().exec();

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
  const result = await Habit.findByIdAndUpdate(habitId).exec();

  await Habit.findByIdAndUpdate(habitId, {
    habitImage: imageUrl,
    status: 'awaitingApproval',
  });

  return result;
};

module.exports = {
  getHabitById,
  checkUserExists,
  checkForDuplicateHabitTime,
  checkGroupExists,
  createNewHabit,
  updateExistingHabit,
  deleteHabitById,
  updateHabitImageUrl,
};
