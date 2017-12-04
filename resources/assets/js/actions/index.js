import * as ContactActions from './contacts';
import * as MemberActions from './members';
import * as ProjectActions from './projects';
import * as OpportunityActions from './opportunities';
import * as TaskActions from './tasks';
import * as AccountActions from './accounts';
import fetch from '../utils/fetch';
import Cookies from 'universal-cookie';
import * as types from './types';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if(error.message) {
        errorMessage = error.message;
    } else if(error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.code === 401) {
        dispatch({
            type: type,
            payload: errorMessage
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}

export function loginUser(formProps) {
    let headers = new Headers();

    headers.set('Accept', '*/*');

    let data = new FormData();
    data.append('_username', formProps.username);
    data.append('_password', formProps.password);

    let cookies = new Cookies();

    return (dispatch) => {
        fetch('/login_check', {
            method: 'POST',
            body: data,
            headers: headers
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                cookies.set('token', data.token, {path: '/'});
                dispatch({type: types.AUTH_USER});
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error);
                errorHandler(dispatch, error, types.AUTH_ERROR);
            });
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch({type: types.UNAUTH_USER});
        Cookies.remove('token', {path: '/'});
        window.location.href = '/login';
    }
}

export const actionCreators = Object.assign({}, ContactActions, MemberActions, ProjectActions, AccountActions, OpportunityActions, TaskActions);

