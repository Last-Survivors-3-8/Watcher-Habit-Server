const updateHabitStatus = require('./updateHabitStatus');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');

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

  await updateHabitStatus(
    {
      status: 'awaitingApproval',
      doDay: day,
    },
    'approvalFailure',
  );

  await updateHabitStatus(
    {
      status: 'awaitingApproval',
      doDay: day,
    },
    'approvalSuccess',
  );
};

module.exports = updateAllHabits;
