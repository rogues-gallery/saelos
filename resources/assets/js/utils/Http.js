import axios from "axios";
import store from "../store";
import { authLogout } from "../modules/auth/store/actions";

const FileDownload = require("react-file-download");

const version = "v1";
const API_URL =
  process.env.NODE_ENV === "test"
    ? process.env.BASE_URL ||
      `http://localhost:${process.env.PORT}/api/${version}/`
    : `${window.SAELOS_CONFIG.APP_URL}/api/${version}`;
const token = localStorage.getItem("access_token");

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(
  response => {
    if (response.data.redirect === true) {
      document.location.href = response.data.destination;

      return;
    }

    if (response.headers["x-suggested-filename"]) {
      return FileDownload(
        response.data,
        response.headers["x-suggested-filename"]
      );
    }

    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(authLogout());
    }

    return Promise.reject(error);
  }
);

export default axios;
