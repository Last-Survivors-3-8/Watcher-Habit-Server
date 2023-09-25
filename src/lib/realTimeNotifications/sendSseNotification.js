const clients = require('../../utils/sseConnections');

function sendSseNotification(userId, notification) {
  const client = clients[userId];

  if (client) {
    client.write(`data: ${JSON.stringify(notification)}\n\n`);
  }
}

module.exports = sendSseNotification;
