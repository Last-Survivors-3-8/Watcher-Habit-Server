const { ERRORS } = require('../utils/ERRORS');
const habitService = require('../services/habitService');

const getHabit = async (req, res, next) => {
  const { habitId } = req.params;

  try {
    const habit = await habitService.getHabitById(habitId);

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

const createHabit = async (req, res, next) => {
  const {
    creator,
    doDay,
    startTime,
    endTime,
    habitStartDate,
    habitEndDate,
    minApprovalCount,
    sharedGroup,
  } = req.body;

  try {
    const hasCreator = await habitService.checkUserExists(creator);
    if (!hasCreator) {
      const err = new Error(ERRORS.USER_NOT_FOUND.MESSAGE);
      err.status = ERRORS.USER_NOT_FOUND.STATUS_CODE;
      return next(err);
    }

    const duplicateHabitTime = await habitService.checkForDuplicateHabitTime({
      creator,
      doDay: { $in: doDay },
      habitStartDate: { $lte: habitEndDate },
      habitEndDate: { $gte: habitStartDate },
      startTime: { $lte: endTime },
      endTime: { $gte: startTime },
    });

    if (duplicateHabitTime) {
      const err = new Error(ERRORS.DUPLICATE_HABIT_TIME.MESSAGE);
      err.status = ERRORS.DUPLICATE_HABIT_TIME.STATUS_CODE;
      err.duplicateHaibt = duplicateHabitTime;
      return next(err);
    }

    if (minApprovalCount === 0) {
      req.body.sharedGroup = null;
    }

    if (req.body.sharedGroup) {
      const hasSharedGroup = await habitService.checkGroupExists(sharedGroup);
      if (!hasSharedGroup) {
        const err = new Error(ERRORS.GROUP_NOT_FOUND.MESSAGE);
        err.status = ERRORS.GROUP_NOT_FOUND.STATUS_CODE;
        return next(err);
      }
    }

    const newHabit = await habitService.createNewHabit(req.body);

    return res.status(201).json(newHabit);
  } catch (error) {
    return next(error);
  }
};

const updateHaibt = async (req, res, next) => {
  const { habitId } = req.params;
  const {
    creator,
    doDay,
    startTime,
    endTime,
    habitStartDate,
    habitEndDate,
    minApprovalCount,
    sharedGroup,
  } = req.body;

  try {
    const habit = await habitService.getHabitById(habitId);

    if (!habit) {
      return res
        .status(ERRORS.HABIT_NOT_FOUND.STATUS_CODE)
        .json({ error: ERRORS.HABIT_NOT_FOUND.MESSAGE });
    }

    if (creator) {
      const hasCreator = await habitService.checkUserExists(creator);
      if (!hasCreator) {
        const err = new Error(ERRORS.USER_NOT_FOUND.MESSAGE);
        err.status = ERRORS.USER_NOT_FOUND.STATUS_CODE;
        return next(err);
      }
    }

    if (doDay || startTime || endTime || habitStartDate || habitEndDate) {
      const duplicateHabitTime = await habitService.checkForDuplicateHabitTime({
        creator: creator || habit.creator,
        doDay: { $in: doDay || habit.doDay },
        habitStartDate: { $lte: habitEndDate || habit.habitEndDate },
        habitEndDate: { $gte: habitStartDate || habit.habitStartDate },
        startTime: { $lte: endTime || habit.endTime },
        endTime: { $gte: startTime || habit.startTime },
      });

      if (duplicateHabitTime && String(duplicateHabitTime._id) !== habitId) {
        const err = new Error(ERRORS.DUPLICATE_HABIT_TIME.MESSAGE);
        err.status = ERRORS.DUPLICATE_HABIT_TIME.STATUS_CODE;
        err.duplicateHabit = duplicateHabitTime;
        return next(err);
      }
    }

    if (minApprovalCount === 0) {
      req.body.sharedGroup = null;
    }

    if (sharedGroup) {
      const hasSharedGroup = await habitService.checkGroupExists(sharedGroup);
      if (!hasSharedGroup) {
        const err = new Error(ERRORS.GROUP_NOT_FOUND.MESSAGE);
        err.status = ERRORS.GROUP_NOT_FOUND.STATUS_CODE;
        return next(err);
      }
    }

    const updatedHabit = await habitService.updateExistingHabit(
      habitId,
      req.body,
    );

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return next(error);
  }
};

const deleteHabit = async (req, res, next) => {
  const { habitId } = req.params;

  try {
    const result = await habitService.deleteHabitById(habitId);
    if (!result) {
      return res
        .status(ERRORS.HABIT_NOT_FOUND.STATUS_CODE)
        .json(ERRORS.HABIT_NOT_FOUND.MESSAGE);
    }

    return res
      .status(200)
      .json({ message: '습관이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHabit,
  createHabit,
  updateHaibt,
  deleteHabit,
};
