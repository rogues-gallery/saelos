import * as types from './types';
import fetch from '../utils/fetch';

export const fetchWorkflows = (page = 1, query = {}) => (dispatch) => {
    dispatch({
        type: types.FETCHING_WORKFLOWS,
        search: query
    });

    let URL = '/workflows?page=' + page;

    if (Object.keys(query).length) {
        Object.keys(query).map((key) => {
            URL = URL + '&' + key + '=' + query[key];
        });
    }

    return fetch(URL)
        .then((response) => {
            dispatch({
                type: types.FETCHING_WORKFLOWS_SUCCESS,
                data: response.data.data,
                dataFetched: true,
                pagination: response.data.meta
            });
        });
};

export const searchWorkflows = (query = {}) => {
    let URL = '/workflows?published=1';

    if (Object.keys(query).length) {
        Object.keys(query).map((key) => {
            URL = URL + '&' + key + '=' + query[key];
        });
    }

    return fetch(URL)
        .then((response) => {
            return response.data.data;
        });
};

export const postWorkflow = (data) => (dispatch) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    dispatch({
        type: types.POSTING_ACCOUNT
    });

    let METHOD = 'POST';
    let URL = '/workflows';

    if (data.hasOwnProperty('id') && data.id !== 'new') {
        URL = URL + '/' + data.id;
        METHOD = 'PATCH';
    } else {
        delete data.id;
    }

    let options = {
        body: data,
        method: METHOD
    };

    fetch(URL, options)
        .then((response) => {
            dispatch({
                type: types.POSTING_ACCOUNT_SUCCESS,
                data: response.data.data,
                dataFetched: true
            })
        });
};
