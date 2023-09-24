/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/updateHabitStatus/updateAllHabits');
const dailyHabitsBackup = require('../lib/dailyHabitsBackup/dailyHabitsBackup');

// 습관 상태변경 및 알림 전송
const job = new CronJob('0 */5 * * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`배치 실행 로그 - ${currentTime}`);

  updateAllHabits();
});

job.start();

// 일일 습관 백업
const habitBackupBatch = new CronJob('0 0 */6 * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`습관 백업 배치 실행 로그 - ${currentTime}`);

  dailyHabitsBackup();
});

habitBackupBatch.start();
