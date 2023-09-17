const getDateDiffFromToday = (dayDiff) => {
  const date = new Date();
  date.setDate(date.getDate() + dayDiff);
  date.setHours(0, 0, 0, 0);
  return date;
};

module.exports = getDateDiffFromToday;
