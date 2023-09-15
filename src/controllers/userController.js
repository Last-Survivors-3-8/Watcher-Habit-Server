const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const userService = require('../services/userService');

const getUserCheck = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await userService.getNicknameByEmail(email);

    if (user) {
      return res.status(200).json({ nickname: user.nickname });
    }

    return res.status(200).json({
      exists: false,
    });
  } catch (error) {
    return next(error);
  }
};

const getUserDailyHabitList = async (req, res, next) => {
  const { nickname } = req.params;

  try {
    const userDailyHabits = await userService.getUserDailyHabits(req, nickname);

    if (!userDailyHabits) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    return res.status(200).json({ data: { [nickname]: userDailyHabits } });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserCheck,
  getUserDailyHabitList,
};
