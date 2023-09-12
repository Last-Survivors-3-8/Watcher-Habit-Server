const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema(
  {
    habitTitle: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
    },
    habitContent: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    habitStartDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
      validate: {
        validator(v) {
          return /^(\d{4})-(\d{2})-(\d{2})$/.test(v) && v <= this.habitEndDate;
        },
        message: '유효하지 않은 시작 날짜입니다.',
      },
    },
    habitEndDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
      validate: {
        validator(v) {
          return (
            /^(\d{4})-(\d{2})-(\d{2})$/.test(v) && v >= this.habitStartDate
          );
        },
        message: '유효하지 않은 종료 날짜입니다.',
      },
    },

    doDay: {
      type: String,
      required: true,
      enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    penalty: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    habitImage: {
      type: String,
      validate: {
        validator(url) {
          return /^(https:\/\/s3\.amazonaws\.com\/${bucket-name}\/).+/.test(
            url,
          );
        },
        message: (props) => `${props.value}는 유효한 S3 URL이 아닙니다.`,
      },
    },
    minApprovalCount: { type: Number, default: 0 },
    approvals: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
          type: String,
          enum: ['approved', 'rejected', 'undecided'],
          default: 'undecided',
        },
      },
    ],
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Notification' },
    ],
    status: {
      type: String,
      enum: [
        'notTimeYet',
        'inProgress',
        'awaitingApproval',
        'awaitingVerification',
        'approvalSuccess',
        'expiredFailure',
        'approvalFailure',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Habit', HabitSchema);
