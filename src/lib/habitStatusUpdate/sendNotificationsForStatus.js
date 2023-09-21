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

  if (newStatus === 'expiredFailure') {
    const approvalIds = habit.approvals.map((approval) => approval._id);
    approvalIds.forEach((approvalId) => {
      createAndSendNotification(
        `${creator.nickname}님이 습관을 실패했습니다. <br>${habit.habitTitle}`,
        creator,
        approvalId,
        habit._id,
        habit.sharedGroup,
        'failure',
      );
    });
  }
};

module.exports = sendNotificationsForStatus;
