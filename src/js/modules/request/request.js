export default class Request {
    constructor() {
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
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
        return fetch(url, options)
            .then(response => response.json());
    }
}