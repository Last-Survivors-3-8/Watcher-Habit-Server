const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    isNeedToSend: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [
        'success',
        'failure',
        'verificationRequest',
        'approveRequest',
        'invite',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Notification', NotificationSchema);
