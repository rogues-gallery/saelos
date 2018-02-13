import * as types from './types';
import fetch from '../utils/fetch';

export const loginUser = (data) => (dispatch) => {
    dispatch({type: types.AUTH_USER});
};

export const logoutUser = () => (dispatch) => {
    dispatch({type: types.UNAUTH_USER});
};

export const isUserAuthenticated = () => (dispatch) => {
    fetch('/authenticated', {forAuth: true})
        .then((response) => {
            if (response.data.status) {
                return dispatch({
                    type: types.AUTH_USER,
                    data: response.data.status
                });
            } else {
                return logoutUser();
            }
        });
};