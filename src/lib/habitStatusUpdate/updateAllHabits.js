const getCurrentDayAndTime = require('./getCurrentDayAndTime');
const getExpiredTime = require('./getExpiredTime');
const updateAwaitingApprovalStatus = require('./updateAwaitingApprovalStatus');
const updateHabitStatus = require('./updateHabitStatus');

const { day, time } = getCurrentDayAndTime();
const expiredTime = getExpiredTime(30);

const updateAllHabits = async () => {
  await updateHabitStatus(
    {
      status: 'notTimeYet',
      doDay: day,
      startTime: { $lte: time },
    },
    'inProgress',
  );

  await updateHabitStatus(
    {
      status: 'inProgress',
      doDay: day,
      endTime: { $lte: time },
    },
    'awaitingVerification',
  );

  await updateHabitStatus(
    {
      status: 'awaitingVerification',
      doDay: day,
      endTime: { $lte: expiredTime },
    },
    'expiredFailure',
  );

  updateAwaitingApprovalStatus();
};

module.exports = updateAllHabits;
