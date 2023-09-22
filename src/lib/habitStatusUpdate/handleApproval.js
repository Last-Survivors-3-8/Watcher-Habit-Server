const Habit = require('../../models/Habit');
const getAdjustTime = require('./getAdjustTime');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');

const handleApproval = async (habits, targetStatus) => {
  const { time } = getCurrentDayAndTime();

  const habitIdsToUpdate = habits
    .filter((habit) => {
      const adjustedEndTime = getAdjustTime(habit.endTime, 0, 6);
      return adjustedEndTime < time;
    })
    .map((habit) => habit._id);

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

      if (
        (targetStatus === 'approvalFailure' &&
          approvedCount < updatedHabit.minApprovalCount) ||
        (targetStatus === 'approvalSuccess' &&
          approvedCount >= updatedHabit.minApprovalCount)
      ) {
        await Habit.updateOne(
          { _id: habitId },
          { $set: { status: targetStatus } },
        );
      }
    }
  });

  await Promise.all(promises);

  return habitIdsToUpdate;
};

module.exports = handleApproval;
