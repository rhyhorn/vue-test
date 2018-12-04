const loggerDecorator = (logger, request) => {
  return (...args) => {
    const [url, params = null] = args;
    const method = params === null
      ? 'GET'
      : params.method || 'GET';

    logger.groupCollapsed(`=> request ${method}: '${url}'`);
    logger.log(`url: ${url}`);
    if (params !== null) {
      logger.log('params:', params);
    }
    logger.groupEnd();

    return request(...args)
      .then((response) => {
        logger.groupCollapsed(`<= response ${method}: '${url}'`);
        logger.log('data: ', response);
        logger.groupEnd();

        return response;
      })
  };
};

export default loggerDecorator;