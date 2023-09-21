const { sendNotification } = require('../../routes/events');
const Notification = require('../../models/Notification');

const createAndSendNotification = async (
  message,
  fromUserId,
  toUserId,
  habitId,
  groupId,
  status,
) => {
  const newNotification = new Notification({
    content: message,
    from: fromUserId,
    to: toUserId,
    habitId,
    groupId,
    status,
  });

  await newNotification.save();

  sendNotification(toUserId.toString(), message);
};

module.exports = createAndSendNotification;
