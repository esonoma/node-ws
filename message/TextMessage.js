const MessageFactory = require("./MessageFactory");

module.exports = class TextMessage extends MessageFactory {
  type = "text";
  createTimeStamp;

  constructor(from, to, message, ext) {
    super();

    this.createTimeStamp = new Date().getTime();
    this.from = from;
    this.to = to;
    this.message = message;
    this.ext = ext;
  }
};
