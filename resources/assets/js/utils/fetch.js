import { API_HOST, API_PATH } from '../config/_entrypoint';
import axios from 'axios';

export default function (url, options = {}) {
  let forAuth = (options.hasOwnProperty('forAuth') && options.forAuth);

  let link = (url.includes(API_PATH) || forAuth)
      ? API_HOST + url
      : API_HOST + API_PATH + url;
  let method = options.hasOwnProperty('method') ? options.method : 'GET';
  let data = options.hasOwnProperty('body') ? options.body : {};

  return axios[method.toLowerCase()](link, data)
      .then(function (response) {
          if (response.statusText === 'OK') return response;

          return response
              .then(json => {
                  const error = json['description'] ? json['description'] : response.statusText;

                  console.error(error);
          });
      })
      .catch(() => {
          // We likely have an expired JWT, so redirect to login
          window.location.href = '/login';
      });
}
