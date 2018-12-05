export default class Response {
  constructor(
    {
      status = false,
      code = null,
      data = {},
      errors = {},
      meta = {
        xsrf: null,
        captcha: false,
      }
    }
  ) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.errors = errors;
    this.meta = meta;
  }
}