const Habit = require('../../models/Habit');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const updateHabitStatus = async (query, newStatus) => {
  const habits = await Habit.find(
    query,
    '_id habitTitle sharedGroup creator approvals',
  ).populate({
    path: 'creator',
    select: 'nickName',
  });

  const habitIds = habits.map((habit) => habit._id);

  if (habitIds.length === 0) {
    console.log(`${newStatus}로 업데이트할 습관이 없습니다.`);

    return;
  }

  console.log(`${newStatus} 업데이트 대상: `, habitIds);

  await Habit.updateMany({ _id: { $in: habitIds } }, { status: newStatus });

  habits.forEach((habit) => {
    sendNotificationsForStatus(habit, newStatus);
  });
};

module.exports = updateHabitStatus;
