/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/updateHabitStatus/updateAllHabits');

const job = new CronJob('0 */5 * * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`배치 실행 로그 - ${currentTime}`);

  updateAllHabits();
});

job.start();
