/* eslint-disable no-console */
const Habit = require('../../models/Habit');
const getAdjustTime = require('./getAdjustTime');
const getKSTDateAndTime = require('./getKSTDateAndTime');
const sendNotificationsForStatus = require('./sendNotificationsForStatus');

const { time } = getKSTDateAndTime();

const updateApprovalStatus = async (query) => {
  const habits = await Habit.find(
    query,
    '_id habitTitle endTime minApprovalCount sharedGroup creator approvals',
  ).populate({
    path: 'creator',
    select: 'nickName',
  });

  const habitIdsToUpdate = habits.map((habit) => habit._id);

  if (habitIdsToUpdate.length === 0) {
    console.log(
      `approvalFailure, approvalSuccess로 업데이트할 습관이 없습니다.`,
    );
    return;
  }

  const approvalFailureIds = [];
  const approvalSuccessIds = [];

  const updateHabitPromises = habits.map(async (habit) => {
    const adjustedEndTime = getAdjustTime(habit.endTime, 0, 6);

    if (adjustedEndTime >= time) return;

    const updateResult = await Habit.updateOne(
      {
        _id: habit._id,
        'approvals.status': 'undecided',
      },
      {
        $set: { 'approvals.$[element].status': 'approved' },
      },
      {
        arrayFilters: [{ 'element.status': 'undecided' }],
      },
    );

    if (updateResult.modifiedCount > 0) {
      const updatedHabit = await Habit.findById(habit._id);
      const approvedCount = updatedHabit.approvals.filter(
        (approval) => approval.status === 'approved',
      ).length;

      const newStatus =
        approvedCount < updatedHabit.minApprovalCount
          ? 'approvalFailure'
          : 'approvalSuccess';

      if (newStatus === 'approvalFailure') {
        approvalFailureIds.push(habit._id);
      } else {
        approvalSuccessIds.push(habit._id);
      }

      await Habit.updateOne(
        { _id: habit._id },
        { $set: { status: newStatus } },
      );

      sendNotificationsForStatus(habit, newStatus);
    }
  });

  await Promise.all(updateHabitPromises);

  if (approvalFailureIds.length > 0) {
    console.log(`approvalFailure로 업데이트된 습관: `, approvalFailureIds);
  }
  if (approvalSuccessIds.length > 0) {
    console.log(`approvalSuccess로 업데이트된 습관: `, approvalSuccessIds);
  }
};

module.exports = updateApprovalStatus;
