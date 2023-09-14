const userService = require('../services/userService');

const getUserCheck = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await userService.getUserCheckByEmail(email);

    if (user) {
      return res.status(200).json({ nickName: user.nickName });
    }

    return res.status(200).json({
      exists: false,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserCheck,
};
