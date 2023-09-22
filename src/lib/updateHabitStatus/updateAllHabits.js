const updateHabitStatus = require('./updateHabitStatus');
const updateApprovalStatus = require('./updateApprovalStatus');
const getKSTDateAndTime = require('./getKSTDateAndTime');

const { day, time, todayDate } = getKSTDateAndTime();

const updateAllHabits = async () => {
  await updateHabitStatus(
    {
      status: 'notTimeYet',
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
      endTime: { $lte: time },
    },
    'inProgress',
  );

  await updateHabitStatus(
    {
      status: 'inProgress',
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
      endTime: { $lte: time },
    },
    'awaitingVerification',
  );

  await updateHabitStatus(
    {
      status: 'awaitingVerification',
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
    },
    'expiredFailure',
  );

  await updateApprovalStatus({
    status: 'awaitingApproval',
    habitStartDate: { $lte: todayDate },
    habitEndDate: { $gte: todayDate },
    doDay: { $in: [day] },
  });
};

module.exports = updateAllHabits;
