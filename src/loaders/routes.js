const userRouter = require('../routes/user');
const checkUserByEmailRouter = require('../routes/checkUserByEmail');
const loginRouter = require('../routes/login');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/userCheck', checkUserByEmailRouter);
  app.use('/api/login', loginRouter);
};
