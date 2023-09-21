const express = require('express');

const router = express.Router();
const clients = {};

function sendNotification(userId, message) {
  const client = clients[userId];
  if (client) {
    client.write(`data: ${JSON.stringify({ message })}\n\n`);
  }
}

router.get('/', (req, res) => {
  const { userId } = req.query;

  if (userId) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients[userId] = res;

    req.on('close', () => {
      delete clients[userId];
    });
  }
});

module.exports = {
  router,
  sendNotification,
};
