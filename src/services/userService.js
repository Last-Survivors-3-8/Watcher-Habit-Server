const User = require('../models/User');

const getNicknameByEmail = (email) =>
  User.findOne({ email }, 'nickname').lean().exec();

module.exports = { getNicknameByEmail };
