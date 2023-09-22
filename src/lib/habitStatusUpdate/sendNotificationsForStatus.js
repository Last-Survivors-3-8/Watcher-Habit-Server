const createAndSendNotification = require('./createAndSendNotification');

const sendNotificationsForStatus = (habit, newStatus) => {
  const { creator } = habit;
  if (newStatus === 'awaitingVerification') {
    createAndSendNotification(
      `인증이 필요한 습관이 있습니다. <br>${habit.habitTitle}`,
      creator,
      creator,
      habit._id,
      habit.sharedGroup,
      'verificationRequest',
    );
  }

  if (newStatus === 'expiredFailure' || newStatus === 'approvalFailure') {
    createAndSendNotification(
      `습관을 실패했습니다. <br>${habit.habitTitle}`,
      creator,
      creator,
      habit._id,
      habit.sharedGroup,
      'failure',
    );
  }

  if (newStatus === 'approvalSuccess') {
    createAndSendNotification(
      `습관을 완료했습니다. <br>${habit.habitTitle}`,
      creator,
      creator,
      habit._id,
      habit.sharedGroup,
      'success',
    );
  }
};

module.exports = sendNotificationsForStatus;
