/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const Habit = require('../../models/Habit');
const HabitHistory = require('../../models/HabitHistory');
const getIncrementedTime = require('../updateHabitStatus/getIncrementedTime');
const getKSTDateAndTime = require('../updateHabitStatus/getKSTDateAndTime');

const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const dailyHabitsBackup = async () => {
  const { day: today, time, todayDate } = getKSTDateAndTime();
  const approveDoneTime = getIncrementedTime(time, 0, -6);
  const yesterDay =
    dayNames[(dayNames.findIndex((day) => day === today) + 6) % 7];

  try {
    const completedHabitToday = await Habit.find({
      endTime: { $lte: approveDoneTime },
      doDay: { $in: [today, yesterDay] },
      habitStartDate: { $lte: todayDate },
      habitEndDate: { $gt: todayDate },
    })
      .lean()
      .exec();

    const userIds = completedHabitToday.map((habit) => habit.creator);

    const existingHabitIds = (
      await HabitHistory.find({
        date: todayDate,
        userId: { $in: userIds },
      }).distinct('habitId')
    ).map((id) => id.toString());

    const newHabits = completedHabitToday
      .filter((habit) => !existingHabitIds.includes(habit._id.toString()))
      .map((habit) => ({
        date: todayDate,
        userId: habit.creator,
        habitId: habit._id,
        habitDetails: habit,
      }));

    if (newHabits.length) {
      await HabitHistory.insertMany(newHabits);
      console.log(
        `${newHabits.length} 개의 습관들이 습관 히스토리에 기록되었습니다.`,
      );
    } else {
      console.log('기록할 습관이 없습니다.');
    }
  } catch (error) {
    console.error('습관 백업 중 문제가 발생했습니다.', error);
  }
};

module.exports = dailyHabitsBackup;
