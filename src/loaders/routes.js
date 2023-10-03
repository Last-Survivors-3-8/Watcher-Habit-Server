const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const habitRouter = require('../routes/habit');
const groupRouter = require('../routes/group');
const notificationRouter = require('../routes/notification');
const eventsRouter = require('../routes/events');
const cookieAPI = require('../routes/cookie');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/habit', habitRouter);
  app.use('/api/group', groupRouter);
  app.use('/api/notification', notificationRouter);
  app.use('/events', eventsRouter);
  app.use('/api', cookieAPI);
};
