import { API_HOST, API_PATH } from '../config/_entrypoint';
import axios from 'axios';

let FileDownload = require('react-file-download');

export default function (url, options = {}) {
  let forAuth = (options.hasOwnProperty('forAuth') && options.forAuth);

  let link = (url.includes(API_PATH) || forAuth)
      ? API_HOST + url
      : API_HOST + API_PATH + url;
  let method = options.hasOwnProperty('method') ? options.method : 'GET';
  let data = options.hasOwnProperty('body') ? options.body : {};

  return axios[method.toLowerCase()](link, data)
      .then((response) => {
          if (response.headers['x-suggested-filename']) {
              return FileDownload(response.data, response.headers['x-suggested-filename']);
          }

          return response;
      })
      .catch((error) => {
          // We likely have an expired JWT, so redirect to login
          console.log(error);
      });
}
