/* eslint-disable no-console */
/* 배치 확인용 console 사용 */
const Notification = require('../../models/Notification');

const updateNotifications = async () => {
  const currentTime = new Date();
  const yesterday = new Date(currentTime);
  yesterday.setDate(yesterday.getDate() - 1);

  const notifications = await Notification.find({
    createdAt: { $gte: yesterday, $lte: currentTime },
    isNeedToSend: true,
  });

  const updates = [];

  notifications.forEach((notification) => {
    let shouldSave = false;
    const updatedNotificationData = { ...notification };

    switch (updatedNotificationData.status) {
      case 'invite':
      case 'failure':
        if (
          currentTime - updatedNotificationData.createdAt >=
          24 * 60 * 60 * 1000
        ) {
          updatedNotificationData.isNeedToSend = false;
          shouldSave = true;
        }
        break;
      case 'verificationRequest':
        if (currentTime - updatedNotificationData.createdAt >= 30 * 60 * 1000) {
          updatedNotificationData.isNeedToSend = false;
          shouldSave = true;
        }
        break;
      case 'approveRequest':
        if (
          currentTime - updatedNotificationData.createdAt >=
          6 * 60 * 60 * 1000
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
          updatedNotificationData,
        ),
      );
    }
  });

  await Promise.all(updates);

  console.log(`${updates.length} 업데이트`);
};

module.exports = updateNotifications;
