const Notification = require('../models/Notification');
const handleError = require('../lib/handleError');
const { ERRORS } = require('../lib/ERRORS');

// TODO 이름 뭘로할지 고민

const getListTemp = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({
      $or: [{ from: userId }, { to: userId }],
      isNeedToSend: true,
      createdAt: {
        // 작성중
      },
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    return next(error);
  }
};

const saveTemp = async (req, res, next) => {
  const { from, to } = req.body;

  try {
    const hasInviteUser = await Notification.exists({ _id: from })
      .lean()
      .exec();
    const hasInvitedUser = await Notification.exists({ _id: to }).lean().exec();

    if (!hasInviteUser || !hasInvitedUser) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const newNotification = new Notification(req.body);
    newNotification.isNeedToSend = true;
    await newNotification.save();

    return res.status(201).json(newNotification);
  } catch (error) {
    return next(error);
  }
};

// const deleteTemp = (req, res, next) => {};

module.exports = {
  getListTemp,
  saveTemp,
  //   deleteTemp,
};
