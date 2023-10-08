/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const Notification = require('../../models/Notification');

const DAY_TO_MILLISECONDS = 24 * 60 * 60 * 1000;
const VERIFICATION_TIME_LIMIT = 30 * 60 * 1000;
const APPROVE_TIME_LIMIT = 6 * 60 * 60 * 1000;

const updateIsNeedToSend = async () => {
  const currentTime = new Date();
  const yesterday = new Date(Date.now() - DAY_TO_MILLISECONDS);

  const notifications = await Notification.find({
    createdAt: { $gte: yesterday, $lte: currentTime },
    isNeedToSend: true,
  });

  const updates = [];
  const updatedIds = [];

  notifications.forEach((notification) => {
    let shouldSave = false;
    const updatedNotificationData = notification.toObject();

    switch (updatedNotificationData.status) {
      case 'invite':
      case 'failure':
      case 'success':
        if (
          currentTime - updatedNotificationData.createdAt >=
          DAY_TO_MILLISECONDS
        ) {
          updatedNotificationData.isNeedToSend = false;
          shouldSave = true;
        }
        break;
      case 'verificationRequest':
        if (
          currentTime - updatedNotificationData.createdAt >=
          VERIFICATION_TIME_LIMIT
        ) {
          updatedNotificationData.isNeedToSend = false;
          shouldSave = true;
        }
        break;
      case 'approveRequest':
        if (
          currentTime - updatedNotificationData.createdAt >=
          APPROVE_TIME_LIMIT
        ) {
          updatedNotificationData.isNeedToSend = false;
          shouldSave = true;
        }
        break;
      default:
        console.log(`알 수 없는 습관 상태: ${updatedNotificationData.status}`);
        break;
    }

    if (shouldSave) {
      updates.push(
        Notification.updateOne(
          { _id: notification._id },
          { $set: { isNeedToSend: false } },
        ),
      );

      updatedIds.push(notification._id.toString());
    }
  });

  await Promise.all(updates);

  console.log(`알림 상태 업데이트 대상: [${updatedIds.join(', ')}]`);
};

module.exports = updateIsNeedToSend;
