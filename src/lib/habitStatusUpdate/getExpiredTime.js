const getExpiredTime = (minutesToAdd = 0, hoursToAdd = 0) => {
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + minutesToAdd);
  endTime.setHours(endTime.getHours() + hoursToAdd);
  const expiredHours = String(endTime.getHours()).padStart(2, '0');
  const expiredMinutes = String(endTime.getMinutes()).padStart(2, '0');
  return `${expiredHours}:${expiredMinutes}`;
};

module.exports = getExpiredTime;
