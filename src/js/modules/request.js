import Request from './request/request';
import logger from './logger';
import loggerDecorator from '../classes/request/logger-decorator';

const responseFactoryDecorator = (request) => {
  return (...args) => {
    return request(...args)
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }

        return null;
      });
  }
};

let fetchFunction = responseFactoryDecorator(fetch);
fetchFunction = loggerDecorator(logger, fetchFunction);

const request = new Request(fetchFunction);

export default request;