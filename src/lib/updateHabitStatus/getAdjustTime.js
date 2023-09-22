const adjustTime = (time, minutesToAdd = 0, hoursToAdd = 0) => {
  const [hours, minutes] = time.split(':').map(Number);
  const adjustedTime = new Date();
  adjustedTime.setHours(hours + hoursToAdd, minutes + minutesToAdd);
  const adjustedHours = String(adjustedTime.getHours()).padStart(2, '0');
  const adjustedMinutes = String(adjustedTime.getMinutes()).padStart(2, '0');
  return `${adjustedHours}:${adjustedMinutes}`;
};

module.exports = adjustTime;
