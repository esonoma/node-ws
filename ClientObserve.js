const Observe = require("./Observe");

module.exports = class ClientObserve extends Observe {
  on(event, socket) {
    const target = this.observers.has(event);
    if (target && Array.isArray(target)) {
      //   this.observers.set(event, [...target, socket]);
      target.push(socket);
    } else if (target === undefined) {
      this.observers.set(event, [socket]);
    }

    return () => {
      const target = this.observers.get(event);
      if (target && Array.isArray(target)) {
        target.splice(target.indexOf(socket), 1);
      }
    };
  }

  eachEmit(event, customHandler) {
    const target = this.observers.get(event);
    target?.forEach((socket) => {
      customHandler(socket);
    });
  }

  emit(event, data) {}
};
