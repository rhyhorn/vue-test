export default class RequestDecorator {
  constructor(request) {
    this.request = request;
  }

  get(...args) {
    return this.request.get(...args);
  }

  post(...args) {
    return this.request.post(...args);
  }

  make(...args) {
    return this.request.make(...args);
  }
}