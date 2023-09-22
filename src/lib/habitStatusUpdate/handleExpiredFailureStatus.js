const getAdjustTime = require('./getAdjustTime');
const getCurrentDayAndTime = require('./getCurrentDayAndTime');

const handleExpiredFailureStatus = async (habits) => {
  const { time } = getCurrentDayAndTime();

  return habits
    .filter((habit) => {
      const adjustedEndTime = getAdjustTime(habit.endTime, 30);
      return adjustedEndTime <= time;
    })
    .map((habit) => habit._id);
};

module.exports = handleExpiredFailureStatus;
