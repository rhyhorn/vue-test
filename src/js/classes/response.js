export default class Response {
  constructor({
                status = false,
                code = null,
                data = {},
                errors = {},
              }) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.errors = errors;
  }


}