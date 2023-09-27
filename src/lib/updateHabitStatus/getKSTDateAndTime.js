const getKSTDateAndTime = () => {
  const now = new Date();
  const KST_OFFSET_HOURS = 9;

  now.setHours(now.getUTCHours() + KST_OFFSET_HOURS);

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const day = days[now.getDay()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const todayDate = now.toISOString().split('T')[0];

  return { day, time, todayDate };
};

module.exports = getKSTDateAndTime;
