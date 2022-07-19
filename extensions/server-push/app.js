const http = require("http");
const {
  setEventStreamHeaders,
  sendEvent,
  reuseServerPushChanel,
} = require("./eventstream");
const url = require("url");

global.serverPushChanel = null;
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const { pathname, query } = parsedUrl;

  res.setHeader("access-control-allow-origin", "*");

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello World</h1>");
  }

  if (pathname === "/evt") {
    setEventStreamHeaders(res);
    global.serverPushChanel = res;
    sendEvent(req, res);
  }

  // client message
  if (pathname === "/msg") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(new Date().toString());

    if (global.serverPushChanel) {
      reuseServerPushChanel(global.serverPushChanel, query, res);
    }
  }
});

server.listen(8900, "localhost", () => {
  console.log("Server is running on port 8900");
});
