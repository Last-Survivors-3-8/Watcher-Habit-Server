const Habit = require('../models/Habit');
const { ERRORS } = require('../utils/ERRORS');

const getHabit = async (req, res, next) => {
  const { habitId } = req.params;
  try {
    const habit = await Habit.findById(habitId).lean().exec();

    if (!habit) {
      return res
        .status(ERRORS.HABIT_NOT_FOUND.STATUS_CODE)
        .json({ error: ERRORS.HABIT_NOT_FOUND.MESSAGE });
    }

    return res.status(200).json(habit);
  } catch (error) {
    return next(error);
  }
};

const createHabit = (req, res, next) => {};

const updateHaibt = (req, res, next) => {};

const deleteHabit = (req, res, next) => {};

module.exports = {
  getHabit,
  createHabit,
  updateHaibt,
  deleteHabit,
};
