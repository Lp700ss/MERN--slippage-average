const WebSocketServer = require('websocket').server;
const { scrapeUSDQuotes } = require('./webScraper');

const clients = [];

const sendQuotesToClients = async () => {
  const quotes = await scrapeUSDQuotes();
  clients.forEach((client) => {
    if (client.connected) {
      client.send(JSON.stringify(quotes));
    }
  });
};

const requireWebSocketAuth = (request, callback) => {
  // Your authentication logic here
};

const setupWebSocketServer = (httpServer) => {
  const wsServer = new WebSocketServer({
    httpServer,
  });

  wsServer.on('request', (request) => {
    requireWebSocketAuth(request, (isAuthenticated) => {
      if (!isAuthenticated) {
        request.reject(401, 'Unauthorized');
        return;
      }

      const connection = request.accept(null, request.origin);
      console.log('WebSocket connection accepted.');

      clients.push(connection);

      connection.on('message', (message) => {
        console.log(`Received message: ${message.utf8Data}`);
        // Handle WebSocket messages
        // ...
      });

      connection.on('close', (reasonCode, description) => {
        console.log(`WebSocket connection closed: ${reasonCode} - ${description}`);
        const index = clients.indexOf(connection);
        if (index !== -1) {
          clients.splice(index, 1);
        }
      });
    });
  });

  setInterval(() => {
    sendQuotesToClients();
  }, 500);
};

module.exports = {
  setupWebSocketServer,
};
