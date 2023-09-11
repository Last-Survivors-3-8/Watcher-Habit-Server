const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
