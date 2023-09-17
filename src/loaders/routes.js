const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const habitRouter = require('../routes/habit');
const groupRouter = require('../routes/group');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/habit', habitRouter);
  app.use('/api/group', groupRouter);
};
