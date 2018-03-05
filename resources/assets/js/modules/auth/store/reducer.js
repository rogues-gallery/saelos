import * as types from './action-types';

const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case types.AUTH_REFRESH_TOKEN:
    case types.AUTH_LOGIN:
      return login(state, payload);
    case types.AUTH_CHECK:
      return checkAuth(state);
    case types.AUTH_LOGOUT:
      return logout(state);
    case types.AUTH_RESET_PASSWORD:
      return resetPassword(state);
    default:
      return state;
  }
};

function login(state, payload) {
  localStorage.setItem('access_token', payload);
  window.axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;

  return {
    ...state, isAuthenticated: true,
  }
}

function checkAuth(state) {
  state = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('access_token')
  })

  if (state.isAuthenticated) {
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  }

  return state;
}

function logout(state) {
  localStorage.removeItem('access_token')

  return {
    ...state, isAuthenticated: false
  }
}

function resetPassword(state) {
  return {
    ...state, resetPassword: true,
  }
}

export const getAuth = (state) => state.isAuthenticated;

export default reducer;
