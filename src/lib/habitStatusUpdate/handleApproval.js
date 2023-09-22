const Habit = require('../../models/Habit');
const getAdjustTime = require('./getAdjustTime');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const handleApproval = async (query) => {
  const habits = await Habit.find(
    query,
    '_id habitTitle endTime minApprovalCount sharedGroup creator approvals',
  ).populate({
    path: 'creator',
    select: 'nickName',
  });

  const { time } = getCurrentDayAndTime();
  let newStatus = '';

  const habitIdsToUpdate = habits
    .filter((habit) => {
      const adjustedEndTime = getAdjustTime(habit.endTime, 40);

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
        $set: { 'approvals.$[].status': 'approved' },
      },
    );

    if (updateResult.modifiedCount > 0) {
      const updatedHabit = await Habit.findById(habitId);
      const approvedCount = updatedHabit.approvals.filter(
        (approval) => approval.status === 'approved',
      ).length;

      newStatus =
        approvedCount < updatedHabit.minApprovalCount
          ? 'approvalFailure'
          : 'approvalSuccess';

      await Habit.updateOne({ _id: habitId }, { $set: { status: newStatus } });
    }
  });

  await Promise.all(promises);

  habits.forEach((habit) => {
    if (habitIdsToUpdate.includes(habit._id)) {
      sendNotificationsForStatus(habit, newStatus);
    }
  });
};

module.exports = handleApproval;
