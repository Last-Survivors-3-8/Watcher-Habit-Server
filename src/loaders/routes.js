const userRouter = require('../routes/user');

module.exports = (app) => {
  app.use('/api/user', userRouter);
};
