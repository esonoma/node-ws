const ClientObserve = require("./ClientObserve");
module.exports = class Client extends ClientObserve {
  clientId;
  socket;

  constructor(clientId, socket) {
    super();
    this.clientId = clientId;
    this.socket = socket;
  }

  subscribe(event, subscribeSocket) {
    return this.on(event, subscribeSocket);
  }

  dispatch(event, data) {
    this.eachEmit(event, () => {
      this.socket.emit(event, data);
    });
  }
};
