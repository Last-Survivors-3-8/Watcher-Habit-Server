const Habit = require('../models/Habit');
const Notification = require('../models/Notification');

const initializeHabit = async (habits) => {
  await Promise.all(
    habits.map(async (habit) => {
      await Habit.findByIdAndUpdate(habit._id, {
        $set: {
          status: 'notTimeYet',
          'approvals.$[].status': 'undecided',
          notifications: [],
          habitImage: '',
        },
      });

      await Notification.updateMany(
        { habitId: habit._id },
        { isNeedToSend: false },
      );
    }),
  );
};

module.exports = initializeHabit;
