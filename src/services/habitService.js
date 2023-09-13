const Habit = require('../models/Habit');
const User = require('../models/User');
const Group = require('../models/Group');

const getHabitById = (habitId) => Habit.findById(habitId).lean().exec();

const checkUserExists = (userId) => User.exists({ _id: userId });

const checkForDuplicateHabitTime = (conditions) =>
  Habit.findOne(conditions).lean().exec();

const checkGroupExists = (groupId) => Group.exists({ _id: groupId });

const createNewHabit = async (habitData) => {
  const habit = new Habit(habitData);
  await habit.save();
  return habit;
};

const updateExistingHabit = (habitId, updatedFields) =>
  Habit.findByIdAndUpdate(habitId, updatedFields, { new: true }).lean().exec();

const deleteHabitById = (habitId) => Habit.findByIdAndDelete(habitId).exec();

module.exports = {
  getHabitById,
  checkUserExists,
  checkForDuplicateHabitTime,
  checkGroupExists,
  createNewHabit,
  updateExistingHabit,
  deleteHabitById,
};
