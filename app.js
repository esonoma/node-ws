const WebSocket = require("ws");
const ClientManager = require("./ClientManager");
const TextMessage = require("./message/TextMessage");

const clientManager = new ClientManager();
global.clientManager = clientManager;
// exports.clientManager = global.clientManager;

const webSocketServer = new WebSocket.WebSocketServer({
  port: 8080,
  perMessageDeflate: false,
  // verifyClient: (info, done) => {
  // const authToken = info.req.headers.authorization;
  // authenticateUser
  // },
});

webSocketServer.on("listening", () => {
  console.log(
    "Server is listening: ws://localhost:" + webSocketServer.address().port
  );
});

webSocketServer.on("connection", (ws, request) => {
  // create a new client object and add it to the client manager
  // id can be used to identify the client
  // you should create a new user via http, and assign a unique id to it
  // TODO:(@branlice): the constructor WebSocketServer provides a cache of all clients,
  //                   stored in the ws.clients member variable,
  //                   to investigate whether querying a single client is supported
  const clientId = new Date().getTime().toString();
  clientManager.register(clientId, ws);

  ws.on("message", (message) => {
    const messageObject = JSON.parse(message);
    try {
      if (messageObject?.type === "text") {
        try {
          new TextMessage(
            clientId,
            messageObject.to,
            messageObject.text,
            {}
          ).singleton();
        } catch (error) {
          console.log("Error: ", error);
        }
        // const toClient = clientManager.getClient(messageObject.to);
        // if (toClient) {
        //   toClient.send(messageObject.text);
        // }
      }
    } catch (error) {
      console.log(error);
    }
    ws.send(messageObject.text);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clientManager.unregister(clientId);
  });
  ws.on("error", (error) => {
    console.log(error);
    clientManager.unregister(clientId);
  });
  ws.send(clientId);
});
