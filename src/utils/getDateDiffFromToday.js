const getDateDiffFromToday = (dayDiff) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(today);
  date.setDate(today.getDate() + dayDiff);
  return date;
};

module.exports = getDateDiffFromToday;
