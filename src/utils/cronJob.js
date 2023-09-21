const { CronJob } = require('cron');
const Habit = require('../models/Habit');
const { sendNotification } = require('../routes/events');

function getCurrentDayAndTime() {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const now = new Date();
  const day = days[now.getDay()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return { day, time };
}

const { day, time } = getCurrentDayAndTime();

function getExpiredTime(minutesToAdd = 0, hoursToAdd = 0) {
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + minutesToAdd);
  endTime.setHours(endTime.getHours() + hoursToAdd);
  const expiredHours = String(endTime.getHours()).padStart(2, '0');
  const expiredMinutes = String(endTime.getMinutes()).padStart(2, '0');
  return `${expiredHours}:${expiredMinutes}`;
}

async function updateAwaitingApprovalStatus() {
  const expiredTime6 = getExpiredTime(0, 6);

  try {
    const habitsToUpdate = await Habit.find({
      status: 'awaitingApproval',
      doDay: day,
      endTime: { $lte: expiredTime6 },
      'approvals.status': 'undecided',
    });

    if (habitsToUpdate.length === 0) {
      console.log('업데이트 대상이 없음.');
      return;
    }

    const habitIds = habitsToUpdate.map((habit) => habit._id);
    console.log('업데이트 대상 습관 IDs:', habitIds);

    const result = await Habit.updateMany(
      {
        _id: { $in: habitIds },
        'approvals.status': 'undecided',
      },
      {
        $set: { 'approvals.$.status': 'approved' },
      },
    );

    console.log(`Updated ${result.nModified} habit approvals.`);
  } catch (err) {
    console.error('Error updating habits:', err);
  }
}

async function updateHabitStatus(query, newStatus) {
  const habits = await Habit.find(query, '_id');
  const habitIds = habits.map((habit) => habit._id);

  if (habitIds.length === 0) {
    console.log(`${newStatus} 상태로 업데이트할 습관이 없습니다.`);
    return;
  }

  console.log(`${newStatus}로 업데이트: `, habitIds);

  await Habit.updateMany({ _id: { $in: habitIds } }, { status: newStatus });

  if (newStatus === 'awaitingVerification') {
    sendNotification('인증이 필요합니다.');
  }
  if (newStatus === 'expiredFailure') {
    sendNotification('습관을 실패하였습니다.');
  }
}
async function updateAllHabits() {
  await updateHabitStatus(
    {
      status: 'notTimeYet',
      doDay: day,
      startTime: { $lte: time },
    },
    'inProgress',
  );

  // 인증 하라는 알림 전송
  await updateHabitStatus(
    {
      status: 'inProgress',
      doDay: day,
      endTime: { $lte: time },
    },
    'awaitingVerification',
  );

  const expiredTime = getExpiredTime(30);

  // 실패 알림 전송 추가
  await updateHabitStatus(
    {
      status: 'awaitingVerification',
      doDay: day,
      endTime: { $lte: expiredTime },
    },
    'expiredFailure',
  );

  updateAwaitingApprovalStatus();
}

console.log('배치 작업 전');

const job = new CronJob('*/10 * * * * *', () => {
  console.log('배치 작업 10초 단위');
  updateAllHabits();
});

console.log('배치 작업 완료');
job.start();
