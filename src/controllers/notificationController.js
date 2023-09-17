const notificationService = require('../services/notificationService');

const getList = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifications = await notificationService.getNotifications(userId);

    return res.status(200).json({ notifications });
  } catch (error) {
    return next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const newNotification = await notificationService.saveNotification(
      req,
      res,
    );

    return res.status(201).json(newNotification);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getList,
  save,
};
