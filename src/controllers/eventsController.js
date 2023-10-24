const clients = require('../utils/sseConnections');

const handleSSEConnection = (req, res) => {
  const { userId } = req.query;

  if (userId) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN);

    clients[userId] = res;

    req.on('close', () => {
      delete clients[userId];
    });
  }
};

module.exports = {
  handleSSEConnection,
};
