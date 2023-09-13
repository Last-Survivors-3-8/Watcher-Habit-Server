const { ERRORS } = require('../utils/ERRORS');
const habitService = require('../services/habitService');
const handleError = require('../utils/handleError');

const getHabit = async (req, res, next) => {
  const { habitId } = req.params;

  try {
    const habit = await habitService.getHabitById(habitId);

    if (!habit) {
      return handleError(res, ERRORS.HABIT_NOT_FOUND);
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
      return handleError(res, ERRORS.USER_NOT_FOUND);
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
      return handleError(res, ERRORS.DUPLICATE_HABIT_TIME, {
        duplicateHabit: duplicateHabitTime,
      });
    }

    if (minApprovalCount === 0) {
      req.body.sharedGroup = null;
    }

    if (req.body.sharedGroup) {
      const hasSharedGroup = await habitService.checkGroupExists(sharedGroup);
      if (!hasSharedGroup) {
        return handleError(res, ERRORS.GROUP_NOT_FOUND);
      }
    }

    const newHabit = await habitService.createNewHabit(req.body);

    return res.status(201).json(newHabit);
  } catch (error) {
    return next(error);
  }
};

const updateHabit = async (req, res, next) => {
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
      return handleError(res, ERRORS.HABIT_NOT_FOUND);
    }

    if (creator) {
      const hasCreator = await habitService.checkUserExists(creator);

      if (!hasCreator) {
        return handleError(res, ERRORS.USER_NOT_FOUND);
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
        return handleError(res, ERRORS.DUPLICATE_HABIT_TIME, {
          duplicateHabit: duplicateHabitTime,
        });
      }
    }

    if (minApprovalCount === 0) {
      req.body.sharedGroup = null;
    }

    if (sharedGroup) {
      const hasSharedGroup = await habitService.checkGroupExists(sharedGroup);
      if (!hasSharedGroup) {
        return handleError(res, ERRORS.GROUP_NOT_FOUND);
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
      return handleError(res, ERRORS.HABIT_NOT_FOUND);
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
  updateHabit,
  deleteHabit,
};
