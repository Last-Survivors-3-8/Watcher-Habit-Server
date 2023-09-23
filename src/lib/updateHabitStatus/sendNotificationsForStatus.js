const createAndSendNotification = require('./createAndSendNotification');

const statusMapping = {
  awaitingVerification: {
    messageFunc: (habitTitle) => `인증이 필요한 습관이 있습니다. ${habitTitle}`,
    status: 'verificationRequest',
  },
  expiredFailure: {
    messageFunc: (habitTitle) => `습관을 실패했습니다. ${habitTitle}`,
    status: 'failure',
  },
  approvalFailure: {
    messageFunc: (habitTitle) => `습관을 실패했습니다. ${habitTitle}`,
    status: 'failure',
  },
  approvalSuccess: {
    messageFunc: (habitTitle) => `습관을 완료했습니다. ${habitTitle}`,
    status: 'success',
  },
};

const sendNotificationsForStatus = (habit, newStatus) => {
  const { creator, habitTitle, _id, sharedGroup } = habit;

  if (!statusMapping[newStatus]) return;

  const { messageFunc, status } = statusMapping[newStatus];
  const message = messageFunc(habitTitle);

  createAndSendNotification(
    message,
    creator._id,
    creator._id,
    _id,
    sharedGroup,
    status,
  );
};

module.exports = sendNotificationsForStatus;
