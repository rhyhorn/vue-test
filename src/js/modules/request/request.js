export default class Request {
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
    return fetch(url, options)
      .then(response => response.json());
  }
}