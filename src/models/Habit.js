const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  habitTitle: {
    type: String,
    required: true,
    maxlength: 10,
  },
  habitContent: {
    type: String,
    required: true,
    maxlength: 100,
  },
  habitStartDate: { type: Date, default: Date.now },
  habitEndDate: { type: Date, default: Date.now },
  doDay: {
    type: String,
    enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  },
  startTime: String,
  endTime: String,
  penalty: {
    type: String,
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
        return /^(https:\/\/s3\.amazonaws\.com\/${bucket-name}\/).+/.test(url);
      },
      message: (props) => `${props.value} is not a valid S3 URL!`,
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
  },
});

module.exports = mongoose.model('Habit', HabitSchema);
