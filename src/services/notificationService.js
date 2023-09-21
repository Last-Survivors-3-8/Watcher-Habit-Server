const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const Habit = require('../models/Habit');
const Notification = require('../models/Notification');
const User = require('../models/User');
const getDateDiffFromToday = require('../utils/getDateDiffFromToday');

const getNotifications = async (userId) => {
  const yesterday = getDateDiffFromToday(-1);
  const tomorrow = getDateDiffFromToday(1);

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
  const { to, habitId } = req.body;

  // if (status !== 'invite' || status !== 'approveRequest') {
  //   return handleError(res, ERRORS.STATUS_NOT_INVITE);
  // }
  const invitedUser = await User.findById(to).exec();

  if (!invitedUser) {
    return handleError(res, ERRORS.USER_NOT_FOUND);
  }

  const newNotification = new Notification(req.body);
  newNotification.isNeedToSend = true;
  await newNotification.save();

  invitedUser.notifications.push(newNotification._id);
  await invitedUser.save();

  if (habitId) {
    const habit = await Habit.findById(habitId).exec();
    habit.notifications.push(habitId);
    await habit.save();
  }

  return newNotification;
};

module.exports = {
  getNotifications,
  saveNotification,
};
