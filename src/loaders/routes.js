const userRouter = require('../routes/user');
const habitRouter = require('../routes/habit');
const checkUserByEmailRouter = require('../routes/checkUserByEmail');
const loginRouter = require('../routes/login');
const refreshTokenRouter = require('../routes/refresh-token');
const logoutRouter = require('../routes/logout');

module.exports = (app) => {
  app.use('/api/userCheck', checkUserByEmailRouter);
  app.use('/api/user', userRouter);
  app.use('/api/habit', habitRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/logout', logoutRouter);
  app.use('/api/refresh-token', refreshTokenRouter);
};
