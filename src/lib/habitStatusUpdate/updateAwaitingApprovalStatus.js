const Habit = require('../../models/Habit');
const getExpiredTime = require('./getExpiredTime');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');
const { sendNotification } = require('../../routes/events');

const updateAwaitingApprovalStatus = async () => {
  const { day } = getCurrentDayAndTime();
  const expiredTime6 = getExpiredTime(0, 6);

  try {
    const habitsToUpdate = await Habit.find({
      status: 'awaitingApproval',
      doDay: day,
      endTime: { $lte: expiredTime6 },
      'approvals.status': 'undecided',
    });

    if (habitsToUpdate.length === 0) {
      console.log('업데이트 대상이 없음.');
      return;
    }

    const promises = habitsToUpdate.map(async (habit) => {
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

        sendNotification(habit.creator, '승인이 필요합니다.');
      }
    });

    await Promise.all(promises);

    console.log(`${habitsToUpdate.length} habit approvals`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = updateAwaitingApprovalStatus;
