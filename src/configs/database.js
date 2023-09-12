const mongoose = require('mongoose');
const debug = require('debug')('app:database');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debug('MongoDB Connected');
  } catch (error) {
    debug('MongoDB Connection Failed');
    process.exit(1);
  }
};

module.exports = connectDB;
