module.exports = class Observe {
  observers = new Map();

  on(event, callback) {}
  emit(event, data) {}
  once(event, callback) {}
  off(event, callback) {}

  getAll(event) {
    return this.observers.get(event);
  }

  has(event, isArray = false) {
    return isArray
      ? this.getAll(event).length
      : this.getAll(event) !== undefined;
  }
};
