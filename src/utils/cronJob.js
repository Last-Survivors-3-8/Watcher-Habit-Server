/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const { CronJob } = require('cron');
const updateAllHabits = require('../lib/updateHabitStatus/updateAllHabits');
const dailyHabitsBackup = require('../lib/dailyHabitsBackup/dailyHabitsBackup');
const updateIsNeedToSend = require('../lib/updateIsNeedToSend/updateIsNeedToSend');

// 습관 상태 업데이트 및 알림 전송 알림 상태 업데이트
const updateAllHabitsBatch = new CronJob('*/5 * * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`습관 상태 업데이트 배치 실행 로그 - ${currentTime}`);

  updateAllHabits();

  console.log(
    `알림 전송 만료 업데이트 배치 실행 로그 - ${new Date().toLocaleString()}`,
  );

  updateIsNeedToSend();
});

// 일일 습관 백업
const habitBackupBatch = new CronJob('0 0 */6 * * *', () => {
  const currentTime = new Date().toLocaleString();
  console.log(`습관 백업 배치 실행 로그 - ${currentTime}`);

  dailyHabitsBackup();
});

updateAllHabitsBatch.start();
habitBackupBatch.start();
