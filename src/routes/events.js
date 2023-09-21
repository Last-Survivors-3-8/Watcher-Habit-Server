const express = require('express');

const router = express.Router();

let clients = [];

function sendNotification(message) {
  clients.forEach((client) =>
    client.write(`data: ${JSON.stringify({ message })}\n\n`),
  );
}

router.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter((client) => client !== res);
  });
});

module.exports = {
  router,
  sendNotification,
};
