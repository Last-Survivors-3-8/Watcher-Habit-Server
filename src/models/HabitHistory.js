const mongoose = require('mongoose');
const HabitSchema = require('./Habit').schema;

const HabitHistorySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^(\d{4})-(\d{2})-(\d{2})$/.test(v);
        },
        message: 'Invalid date format',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    habitDetails: HabitSchema,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HabitHistory', HabitHistorySchema);
