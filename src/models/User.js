const mongoose = require('mongoose');
const { ERRORS } = require('../utils/ERRORS');

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: ERRORS.NICKNAME_NO_BLANK_CONTAINED,
    },
  },
  profileImageUrl: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: ERRORS.EMAIL_INVALID,
    },
  },
  password: {
    type: String,
    required() {
      return this.socialLoginType === 'none';
    },
  },
  socialLoginType: {
    type: String,
    enum: ['none', 'facebook', 'google', 'twitter'],
    required: true,
  },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Notification' },
  ],
});

module.exports = mongoose.model('User', UserSchema);
