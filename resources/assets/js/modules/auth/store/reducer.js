import * as types from "./action-types";

const initialState = {
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_REFRESH_TOKEN:
    case types.AUTH_LOGIN:
      localStorage.setItem("access_token", action.data);
      window.axios.defaults.headers.common["Authorization"] = `Bearer ${
        action.data
      }`;

      return {
        ...state,
        isAuthenticated: true
      };
    case types.AUTH_CHECK:
      state = Object.assign({}, state, {
        isAuthenticated: !!localStorage.getItem("access_token")
      });

      if (state.isAuthenticated) {
        window.axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
      }

      return state;
    case types.AUTH_LOGOUT:
      localStorage.removeItem("access_token");

      // @todo delete window.axios.defaults.headers.common["Authorization"]

      return {
        ...state,
        isAuthenticated: false
      };
    case types.AUTH_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: true
      };
    default:
      return state;
  }
};

export const getAuth = state => state.isAuthenticated;

export default reducer;
