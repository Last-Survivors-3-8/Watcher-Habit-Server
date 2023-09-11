const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
    },
    invitationCode: {
      type: String,
      required: true,
      unique: true,
    },
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    habits: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Group', GroupSchema);
