const Habit = require('../../models/Habit');
const handleApproval = require('./handleApproval');
const handleExpiredFailureStatus = require('./handleExpiredFailureStatus');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const updateHabitStatus = async (query, newStatus) => {
  const habits = await Habit.find(
    query,
    '_id habitTitle endTime sharedGroup creator approvals',
  ).populate({
    path: 'creator',
    select: 'nickName',
  });

  let habitIdsToUpdate = habits.map((habit) => habit._id);

  if (newStatus === 'expiredFailure') {
    habitIdsToUpdate = await handleExpiredFailureStatus(habits);
  }

  if (newStatus === 'approvalFailure') {
    handleApproval(habits, newStatus);
  }

  if (newStatus === 'approvalSuccess') {
    handleApproval(habits, newStatus);
  }

  if (habitIdsToUpdate.length === 0) {
    console.log(`${newStatus}로 업데이트할 습관이 없습니다.`);
    return;
  }

  console.log(`${newStatus} 업데이트 대상: `, habitIdsToUpdate);

  await Habit.updateMany(
    { _id: { $in: habitIdsToUpdate } },
    { status: newStatus },
  );

  habits.forEach((habit) => {
    if (habitIdsToUpdate.includes(habit._id)) {
      sendNotificationsForStatus(habit, newStatus);
    }
  });
};

module.exports = updateHabitStatus;
