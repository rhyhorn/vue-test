export default class Request {
  constructor(fetch) {
    this.fetch = fetch;
  }

  get(url) {
    return this.make(url, {
      method: 'GET'
    });
  }

  post(url, data) {
    return this.make(url, {
      method: 'POST'
    });
  }

  make(url, options) {
    return this.fetch(url, options);
  }
}