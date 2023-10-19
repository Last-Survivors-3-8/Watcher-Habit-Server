const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERRORS } = require('../lib/ERRORS');
const handleError = require('../lib/handleError');
const createAndSetTokens = require('../utils/createAndSetTokens');
const sendSseNotification = require('../lib/realTimeNotifications/sendSseNotification');
const Notification = require('../models/Notification');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const accessToken = await createAndSetTokens(user, res);

    const unsentNotifications = await Notification.find({
      to: user._id,
      isNeedToSend: true,
    }).exec();

    unsentNotifications.forEach((notification) => {
      sendSseNotification(user._id.toString(), notification);
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const logout = (_, res, next) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ message: '로그아웃 정상 처리되었습니다.' });
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokenFromCookies = req.cookies.refreshToken;

    if (!tokenFromCookies) {
      return handleError(res, ERRORS.NO_REFRESH_TOKEN);
    }

    let decoded;
    try {
      decoded = jwt.verify(tokenFromCookies, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return handleError(res, ERRORS.REFRESH_TOKEN_EXPIRED);
      }
      return handleError(res, ERRORS.INVALID_REFRESH_TOKEN);
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }

    const newAccessToken = await createAndSetTokens(user, res, false);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, logout, refreshToken };