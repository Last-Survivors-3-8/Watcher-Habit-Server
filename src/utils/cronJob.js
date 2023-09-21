/* eslint-disable no-console */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/habitStatusUpdate/updateAllHabits');

const job = new CronJob('*/20 * * * * *', () => {
  console.log('배치 확인');
  updateAllHabits();
});

job.start();
