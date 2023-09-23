const getKSTDateAndTime = () => {
  const KST_OFFSET_HOURS = 9;
  const KST_OFFSET_MILLISECONDS = KST_OFFSET_HOURS * 60 * 60 * 1000;

  const now = new Date(Date.now() + KST_OFFSET_MILLISECONDS);

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const day = days[now.getUTCDay()];
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const todayDate = now.toISOString().split('T')[0];

  return { day, time, todayDate };
};

module.exports = getKSTDateAndTime;
