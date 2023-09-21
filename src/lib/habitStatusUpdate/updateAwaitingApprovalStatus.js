/* eslint-disable no-console */
const Habit = require('../../models/Habit');
const getExpiredTime = require('./getExpiredTime');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const updateAwaitingApprovalStatus = async () => {
  const { day } = getCurrentDayAndTime();
  const expiredTime6 = getExpiredTime(0, 6);

  try {
    const habits = await Habit.find({
      status: 'awaitingApproval',
      doDay: day,
      endTime: { $lte: expiredTime6 },
      'approvals.status': 'undecided',
    });

    const habitIds = habits.map((habit) => habit._id);

    if (habitIds.length === 0) {
      console.log(
        'approvalFailure, approvalSuccess로 업데이트할 습관이 없습니다.',
      );

      return;
    }

    console.log('approvalFailure, approvalSuccess 업데이트 대상: ', habitIds);

    const promises = habits.map(async (habit) => {
      const habitId = habit._id;

      const updateResult = await Habit.updateOne(
        {
          _id: habitId,
          'approvals.status': 'undecided',
        },
        {
          $set: { 'approvals.$.status': 'approved' },
        },
      );

      if (updateResult.nModified > 0) {
        const updatedHabit = await Habit.findById(habitId);

        const approvedCount = updatedHabit.approvals.filter(
          (approval) => approval.status === 'approved',
        ).length;

        const newStatus =
          approvedCount >= updatedHabit.minApprovalCount
            ? 'approvalSuccess'
            : 'approvalFailure';

        await Habit.updateOne(
          { _id: habitId },
          { $set: { status: newStatus } },
        );

        sendNotificationsForStatus(habit, newStatus);
      }
    });

    await Promise.all(promises);

    console.log(`${habits.length} habit approvals`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = updateAwaitingApprovalStatus;
