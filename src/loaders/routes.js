module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Server is running');
  });
};
