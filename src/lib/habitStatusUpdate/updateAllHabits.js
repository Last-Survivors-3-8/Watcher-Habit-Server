const updateHabitStatus = require('./updateHabitStatus');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');
const handleApproval = require('./handleApproval');

const { day, time } = getCurrentDayAndTime();

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
    },
    'expiredFailure',
  );

  await handleApproval({
    status: 'awaitingApproval',
    doDay: day,
  });
};

module.exports = updateAllHabits;
