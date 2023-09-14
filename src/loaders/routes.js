const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const habitRouter = require('../routes/habit');
const refreshTokenRouter = require('../routes/refresh-token');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/habit', habitRouter);
  app.use('/api/refresh-token', refreshTokenRouter);
};
