/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const Habit = require('../../models/Habit');
const initializeHabit = require('../initializeHabit');
const handleExpiredFailureStatus = require('./handleExpiredFailureStatus');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const updateHabitStatus = async (query, newStatus) => {
  const habits = await Habit.find(
    query,
    '_id habitTitle endTime minApprovalCount sharedGroup creator approvals',
  ).populate({
    path: 'creator',
    select: 'nickName',
  });

  let habitIdsToUpdate = habits.map((habit) => habit._id);

  if (habitIdsToUpdate.length === 0) {
    console.log(`${newStatus}로 업데이트할 습관이 없습니다.`);

    return;
  }

  if (
    ['approvalSuccess', 'expiredFailure', 'approvalFailure'].includes(newStatus)
  ) {
    initializeHabit(habits);
  }

  if (newStatus === 'awaitingVerification') {
    await Promise.all(
      habits.map(async (habit) => {
        if (habit.minApprovalCount > habit.approvals.length) {
          return Habit.updateOne(
            { _id: habit._id },
            {
              minApprovalCount: habit.approvals.length,
            },
          );
        }

        return null;
      }),
    );
  }

  if (newStatus === 'expiredFailure') {
    habitIdsToUpdate = await handleExpiredFailureStatus(habits);
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
