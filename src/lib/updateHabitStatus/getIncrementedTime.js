const getKSTDateAndTime = require('./getKSTDateAndTime');

const getIncrementedTime = (time, minutesToAdd = 0, hoursToAdd = 0) => {
  const { todayDate } = getKSTDateAndTime();

  const [hours, minutes] = time
    .split(':')
    .map((val) => String(val).padStart(2, '0'));

  const adjustedTime = new Date(`${todayDate}T${hours}:${minutes}:00+09:00`);

  adjustedTime.setHours(adjustedTime.getHours() + hoursToAdd);
  adjustedTime.setMinutes(adjustedTime.getMinutes() + minutesToAdd);

  const adjustedHours = String(adjustedTime.getHours()).padStart(2, '0');
  const adjustedMinutes = String(adjustedTime.getMinutes()).padStart(2, '0');

  return `${adjustedHours}:${adjustedMinutes}`;
};

module.exports = getIncrementedTime;
