/* eslint-disable no-console */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/updateHabitStatus/updateAllHabits');
const updateNotifications = require('../lib/updateNotifications');

const job = new CronJob('0,15,30,45 * * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`배치 실행 로그 - ${currentTime}`);

  updateNotifications();
  // updateAllHabits();
});

job.start();
