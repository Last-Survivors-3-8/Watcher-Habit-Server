const getAdjustTime = require('./getAdjustTime');
const getKSTDateAndTime = require('./getKSTDateAndTime');

const handleExpiredFailureStatus = async (habits) => {
  const { time } = getKSTDateAndTime();

  return habits
    .filter((habit) => {
      const adjustedEndTime = getAdjustTime(habit.endTime, 30);

      return adjustedEndTime <= time;
    })
    .map((habit) => habit._id);
};

module.exports = handleExpiredFailureStatus;
