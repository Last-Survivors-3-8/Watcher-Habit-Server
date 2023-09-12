const userRouter = require('../routes/user');
const habitRouter = require('../routes/habit');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/habit', habitRouter);
};
