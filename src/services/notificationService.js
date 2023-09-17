const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const Notification = require('../models/Notification');
const User = require('../models/User');
const getDateDiffFromToday = require('../utils/getDateDiffFromToday');

const getNotifications = async (userId) => {
  const yesterday = getDateDiffFromToday(-10);
  const tomorrow = getDateDiffFromToday(10);

  const notifications = await Notification.find({
    to: userId,
    isNeedToSend: true,
    createdAt: {
      $gte: yesterday,
      $lt: tomorrow,
    },
  })
    .lean()
    .exec();

  return notifications;
};

const saveNotification = async (req, res) => {
  const { to, status } = req.body;

  if (status !== 'invite') {
    return handleError(res, ERRORS.STATUS_NOT_INVITE);
  }
  const invitedUser = await User.findById(to).lean().exec();

  if (!invitedUser) {
    return handleError(res, ERRORS.USER_NOT_FOUND);
  }

  const newNotification = new Notification(req.body);
  newNotification.isNeedToSend = true;
  await newNotification.save();

  invitedUser.notifications.push(newNotification._id);
  await invitedUser.save();

  return newNotification;
};

module.exports = {
  getNotifications,
  saveNotification,
};
