export const xrfTokenDecorator = (request) => {
  let xrfToken = null;

  const targetFunction = request.make;

  request.make = function (url, params = null, ...args) {
    let modifiedParams = params;

    if (modifiedParams !== null
      && modifiedParams.method === 'POST'
    ) {
      modifiedParams = {
        ...params,
        _xrf: xrfToken
      };
    }

    return targetFunction.call(request, url, modifiedParams, ...args)
      .then((response) => {
        xrfToken = (response._xrf !== undefined)
          ? response._xrf
          : xrfToken;

        return response;
      });
  };
};