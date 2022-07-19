// const { clientManager } = require("../app");

module.exports = class MessageFactory {
  type;

  from;
  to;

  message = {};

  ext = {};

  // _clientManager = clientManager;

  constructor() {}

  singleton() {
    const client = global.clientManager.getClient(this.to);
    if (client) {
      client.send(
        JSON.stringify({
          data: {
            type: this.type,
            from: this.from,
            to: this.to,
            message: this.message,
            ext: this.ext,
          },
        })
      );
    }
  }
  group(from, to, message) {}
  broadcast(from, message, ext) {
    global.clientManager.clients.forEach((client) => {
      client.send({
        data: JSON.stringify({
          type: this.type,
          from,
          message,
          ext,
        }),
      });
    });
  }
};
