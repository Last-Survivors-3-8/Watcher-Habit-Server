const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    maxlength: 15,
  },
  invitationCode: {
    type: String,
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
});

module.exports = mongoose.model('Group', GroupSchema);
