const User = require('../models/User');

const getUserCheckByEmail = (email) => User.findOne({ email });

module.exports = { getUserCheckByEmail };
