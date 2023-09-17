const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const uploadImage = require('../services/aws/s3Service');
const habitService = require('../services/habitService');
const User = require('../models/User');

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
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
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
    const updateFields = { ...req.body };

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
        startTime: { $lt: endTime || habit.endTime },
        endTime: { $gt: startTime || habit.startTime },
      });

      if (duplicateHabitTime && String(duplicateHabitTime._id) !== habitId) {
        return handleError(res, ERRORS.DUPLICATE_HABIT_TIME, {
          duplicateHabit: duplicateHabitTime,
        });
      }
    }

    if (minApprovalCount === 0) {
      updateFields.sharedGroup = null;
    }

    if (sharedGroup) {
      const hasSharedGroup = await habitService.checkGroupExists(sharedGroup);
      if (!hasSharedGroup) {
        return handleError(res, ERRORS.GROUP_NOT_FOUND);
      }
    }

    const updatedHabit = await habitService.updateExistingHabit(
      habitId,
      updateFields,
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

const updateHabitImage = async (req, res, next) => {
  const { habitId } = req.params;

  try {
    if (req.file) {
      const imageName = `${Date.now().toString()}-${req.file.originalname}`;
      const imageUrl = await uploadImage(
        req.file.buffer,
        imageName,
        req.file.mimetype,
      );

      if (!imageUrl) {
        return handleError(res, ERRORS.IMAGE_UPLOAD_FAILED);
      }

      const result = await habitService.updateHabitImageUrl(habitId, imageUrl);

      if (!result) {
        return handleError(res, ERRORS.HABIT_NOT_FOUND);
      }

      return res
        .status(200)
        .json({ message: '사진 업로드 성공하였습니다.', imageUrl });
    }
  } catch (error) {
    return next(error);
  }

  return null;
};

const subscribeWatcher = async (req, res, next) => {
  const { habitId } = req.params;
  const { watcherId } = req.body;

  try {
    const updateFields = { ...req.body };

    const habit = await habitService.getHabitById(habitId);

    if (!habit) {
      return handleError(res, ERRORS.HABIT_NOT_FOUND);
    }

    const isMember = User.exists({
      _id: watcherId,
      sharedGroup: habit.sharedGroup,
    })
      .lean()
      .exec();

    if (!isMember) {
      return handleError(res, ERRORS.NOT_SHARED_GROUP);
    }

    const alreadySubscribed = habit.approvals.some(
      (approval) => String(approval._id._id) === String(watcherId),
    );

    if (alreadySubscribed) {
      return handleError(res, ERRORS.ALREADY_SUBSCRIBED);
    }

    updateFields.$push = {
      approvals: { _id: watcherId, status: 'undecided' },
    };

    const updatedHabit = await habitService.updateExistingHabit(
      habitId,
      updateFields,
    );

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return next(error);
  }
};

const unSubscribeWatcher = async (req, res, next) => {
  const { habitId, watcherId } = req.params;

  try {
    const updateFields = {};

    const habit = await habitService.getHabitById(habitId);

    if (!habit) {
      return handleError(res, ERRORS.HABIT_NOT_FOUND);
    }

    const isMember = User.exists({
      _id: watcherId,
      sharedGroup: habit.sharedGroup,
    })
      .lean()
      .exec();

    if (isMember) {
      updateFields.$pull = {
        approvals: { _id: watcherId },
      };
    }

    const updatedHabit = await habitService.updateExistingHabit(
      habitId,
      updateFields,
    );

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  updateHabitImage,
  subscribeWatcher,
  unSubscribeWatcher,
};
