import { SubmissionError } from 'redux-form';
import { API_HOST, API_PATH } from '../config/_entrypoint';
import Cookies from 'universal-cookie';
import axios from 'axios';

const jsonLdMimeType = 'application/ld+json';

export default function (url, options = {}) {
  if ('undefined' === typeof options.headers) options.headers = new Headers();
  if (null === options.headers.get('Accept')) options.headers.set('Accept', jsonLdMimeType);

  if ('undefined' !== options.body && !(options.body instanceof FormData) && null === options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', jsonLdMimeType);
  }

  let forAuth = (options.hasOwnProperty('forAuth') && options.forAuth);
  let cookies = new Cookies();
  let bearerToken = cookies.get('token');

  if (bearerToken && /\/login/.test(window.location.href) === false) {
      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;
  } else {
      delete window.axios.defaults.headers.common['Authorization'];
  }

  let link = (url.includes(API_PATH) || forAuth)
      ? API_HOST + url
      : API_HOST + API_PATH + url;
  let method = options.hasOwnProperty('method') ? options.method : 'GET';
  let data = options.hasOwnProperty('body') ? options.body : {};

  return axios[method.toLowerCase()](link, data).then(function (response) {
      if (response.statusText === 'OK') return response;

      return response
          .then(json => {
              const error = json['description'] ? json['description'] : response.statusText;

              // We likely have an expired JWT, so redirect to login
              window.location.href = '/login';
              if (!json.violations) throw Error(error);

              let errors = {_error: error};
              json.violations.map((violation) => errors[violation.propertyPath] = violation.message);

              throw new SubmissionError(errors);
          });
  });
}
