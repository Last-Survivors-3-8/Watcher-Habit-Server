const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: '닉네임은 공백이나 특수문자를 포함할 수 없습니다.',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: '올바르지 않은 이메일 형식입니다.',
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
