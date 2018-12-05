import request from '../modules/request';
import Response from "../classes/response";

export default {
  login({login, password}) {
    return request.get('json/auth-error.json')
      .then((response) => {
        return Promise.reject(new Response({
          data: response,
          meta: {
            xsrf: null,
            captcha: true
          }
        }));
      });
  },
  register({login}) {
    return request.post('/api/register', {
      data: {
        login
      }
    });
  }
};
