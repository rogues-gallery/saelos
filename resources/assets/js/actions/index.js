import * as ContactActions from './contacts';
import * as MemberActions from './members';
import * as ProjectActions from './projects';
import * as OpportunityActions from './opportunities';
import * as TaskActions from './tasks';
import * as AccountActions from './accounts';
import fetch from '../utils/fetch';
import Cookies from 'universal-cookie';
import * as types from './types';
import {API_CLIENT_ID, API_CLIENT_SECRET, API_GRANT_TYPE, API_SCOPE} from "../config/_entrypoint";

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
    data.append('username', formProps.username);
    data.append('password', formProps.password);
    data.append('grant_type', API_GRANT_TYPE);
    data.append('client_id', API_CLIENT_ID);
    data.append('client_secret', API_CLIENT_SECRET);
    data.append('scope', API_SCOPE);

    let cookies = new Cookies();

    return (dispatch) => {
        fetch('/oauth/token', {
            method: 'POST',
            body: data,
            headers: headers,
            forAuth: true
        })
            .then((data) => {
                cookies.set('token', data.access_token, {path: '/'});
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

