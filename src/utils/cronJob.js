/* eslint-disable no-console */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/updateHabitStatus/updateAllHabits');

const job = new CronJob('*/20 * * * * *', () => {
  console.log('배치 실행 로그');

  updateAllHabits();
});

job.start();
