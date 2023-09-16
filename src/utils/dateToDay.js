const dateToDay = (dateString) => {
  const date = new Date(dateString);
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayOfWeek = date.getDay();
  return dayNames[dayOfWeek];
};

module.exports = dateToDay;
