import RequestDecorator from "./requsest-decorator";

class XrfTokenDecorator extends RequestDecorator {
  constructor(xrfToken, ...args) {
    super(...args);
    this.xrfToken = xrfToken;
  }

  make(url, params = null, ...args) {
    let modifiedParams = params;

    if (modifiedParams !== null
      && modifiedParams.method === 'POST'
    ) {
      modifiedParams = {
        ...params,
        _xrf: this.xrfToken
      };
    }

    return this.make(url, modifiedParams, ...args)
      .then((response) => {
        this.xrfToken = (response._xrf !== undefined)
          ? response._xrf
          : this.xrfToken;

        return response;
      });

  }
}