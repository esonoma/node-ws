exports.setEventStreamHeaders = function (res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
};

exports.sendEvent = function (req, res) {
  setInterval(() => {
    res.write(
      `data: ${JSON.stringify({
        type: "event",
        mode: "ping",
        message: "server push, ping",
      })} \n\n`
    );
  }, 3000);
};

exports.reuseServerPushChanel = function (serverPushChanel, query, res) {
  serverPushChanel.write(
    `data: ${JSON.stringify({
      type: "event",
      mode: "msg",
      message: query,
    })} \n\n`
  );
};
