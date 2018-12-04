import request from '../modules/request';

export default {
  login({login, password}) {
    return request.get('json/auth-error.json');
  },
  register({login}) {
    return request.post('/api/register', {
      data: {
        login
      }
    });
  }
};
