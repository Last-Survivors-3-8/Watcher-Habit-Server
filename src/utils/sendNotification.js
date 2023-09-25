const clients = require('./sseConnections');

function sendNotification(userId, notification) {
  const client = clients[userId];

  if (client) {
    client.write(`data: ${JSON.stringify(notification)}\n\n`);
  }
}

module.exports = sendNotification;
