const response = {
  status: true,
  data: [],
  errors: null,
  origin: null,
  meta: {
    xsrf: null,
    captcha: false,
  }
};

const errorResponse = {
  status: false,
  data: null,
  errors: {
    general: [
      'login_failed'
    ],
    email: [
      'Incorrect email or password'
    ]
  },
  origin: null,
  meta: null,
};

const jsonApiResponseAdapter = (response) => {
  const status = (response.errors !== undefined);
  const errors = response.errors || null;
  const data = response.data || null;

  const xsrf = (response.meta._xsrf)
    ? response.meta._xsrf
    : null;

  const captcha = (response.meta.captcha)
    ? response.meta.captcha
    : false;

  return {
    status,
    data,
    errors,
    origin: response,
    meta: {
      xsrf,
      captcha
    }
  }
};

const responseAdapter = (response) => {
  const status = (response.result !== 1);
  const errors = response._errors || null;
  const data = response.data || null;

  const captcha = (response.captcha !== undefined)
    ? response.captcha
    : false;

  const xsrf = (response._xsrf)
    ? response._xsrf
    : null;

  return {
    status,
    data,
    errors,
    origin: response,
    meta: {
      xsrf,
      captcha
    }
  }
};

const undefinedResponseAdapter = (response) => {
  return {
    status: false,
    data: null,
    errors: response,
    origin: response,
    meta: {}
  }
};

const responseFactory = (response) => {
  if (response.jsonapi !== undefined) {
    return jsonApiResponseAdapter(response);
  }

  if (response.result !== undefined) {
    return responseAdapter(response);
  }

  return undefinedResponseAdapter(response);
};
