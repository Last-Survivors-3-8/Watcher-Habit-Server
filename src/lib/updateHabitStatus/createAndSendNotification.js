const sendNotification = require('../../utils/sendNotification');
const Notification = require('../../models/Notification');
const { ERRORS } = require('../ERRORS');

const createAndSendNotification = async (
  message,
  fromUserId,
  toUserId,
  habitId,
  groupId,
  status,
) => {
  try {
    const newNotification = new Notification({
      content: message,
      from: fromUserId,
      to: toUserId,
      habitId,
      groupId,
      status,
    });

    await newNotification.save();

    sendNotification(toUserId.toString(), newNotification);
  } catch (error) {
    throw new Error(ERRORS.NOTIFICATION_SEND_FAILED);
  }
};

module.exports = createAndSendNotification;
