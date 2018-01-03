import * as types from './types';
import fetch from '../utils/fetch';

export function loginUser(data) {
    return (dispatch) => {
        dispatch({type: types.AUTH_USER});
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch({type: types.UNAUTH_USER});
    }
}

export function isUserAuthenticated() {
    return (dispatch) => {
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
    }
}