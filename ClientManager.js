const Client = require("./Client");

module.exports = class ClientManager {
  clients = new Map();
  createClient(clientId, socket) {
    const client = new Client(clientId, socket);
    this.register(clientId, client);
    return client;
  }

  register(clientId, client) {
    this.clients.set(clientId, client);
  }

  unregister(clientId) {
    this.clients.delete(clientId);
  }

  getClient(clientId) {
    return this.clients.get(clientId);
  }

  clear() {
    this.clients.clear();
  }

  getClients() {
    return this.clients;
  }
};
