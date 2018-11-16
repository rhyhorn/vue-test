import RequestDecorator from "./requsest-decorator";
import {getTimeStamp} from "../Logger";

class LoggerDecorator extends RequestDecorator {
  constructor(logger, ...args) {
    super(...args);
    this.logger = logger;
  }

  make(...args) {
    const [url, params = null] = args;
    const method = params === null
      ? 'GET'
      : params.method || 'GET';

    console.groupCollapsed(getTimeStamp(), `=> request ${method}: '${url}'`);
    console.log(`url: ${url}`);
    if (params !== null) {
      console.log('params:', params);
    }
    console.groupEnd();

    return this.request(...args)
      .then((response) => {
        console.groupCollapsed(getTimeStamp(), `<= response ${method}: '${url}'`);
        console.log('data: ', response);
        console.groupEnd();

        return response;
      });
  }
}