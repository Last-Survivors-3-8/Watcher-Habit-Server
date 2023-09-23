const getIncrementedTime = require('./getIncrementedTime');
const getKSTDateAndTime = require('./getKSTDateAndTime');

const handleExpiredFailureStatus = async (habits) => {
  const { time } = getKSTDateAndTime();

  return habits
    .filter((habit) => {
      const adjustedEndTime = getIncrementedTime(habit.endTime, 30);

      return adjustedEndTime <= time;
    })
    .map((habit) => habit._id);
};

module.exports = handleExpiredFailureStatus;
