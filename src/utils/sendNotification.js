const clients = require('./sseConnections');

function sendNotification(userId, message) {
  const client = clients[userId];

  if (client) {
    client.write(`data: ${JSON.stringify({ message })}\n\n`);
  }
}

module.exports = sendNotification;
