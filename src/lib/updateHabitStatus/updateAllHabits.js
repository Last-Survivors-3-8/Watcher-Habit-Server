const updateHabitStatus = require('./updateHabitStatus');
const updateApprovalStatus = require('./updateApprovalStatus');
const getKSTDateAndTime = require('./getKSTDateAndTime');
const getIncrementedTime = require('./getIncrementedTime');

const updateAllHabits = async () => {
  const { day, time, todayDate } = getKSTDateAndTime();

  await updateHabitStatus(
    {
      status: { $in: ['approvalSuccess', 'expiredFailure', 'approvalFailure'] },
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
      startTime: { $lte: time },
      endTime: { $gte: time },
    },
    'notTimeYet',
  );

  await updateHabitStatus(
    {
      status: 'notTimeYet',
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
      startTime: { $lte: time },
      endTime: { $gte: time },
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

  const expireTime = getIncrementedTime(time, -30);

  await updateHabitStatus(
    {
      status: 'awaitingVerification',
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gte: todayDate },
      doDay: { $in: [day] },
      endTime: { $lte: expireTime },
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
