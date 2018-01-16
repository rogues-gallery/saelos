import * as types from './types';
import fetch from '../utils/fetch';

export function fetchAccounts(page = 1, query = {}) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_ACCOUNTS,
            search: query
        });

        let URL = '/companies?page=' + page;

        if (Object.keys(query).length) {
            Object.keys(query).map((key) => {
                URL = URL + '&' + key + '=' + query[key];
            });
        }

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_ACCOUNTS_SUCCESS,
                    data: response.data.data,
                    dataFetched: true,
                    pagination: response.data.meta
                });
            });
    }
}

export function fetchAccount(id) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_SINGLE_ACCOUNT
        });

        let URL = '/companies/' + id;

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_SINGLE_ACCOUNT_SUCCESS,
                    data: response.data.data,
                    dataFetched: true
                });
            });
    }
}

export function fetchAccountCustomFields() {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_ACCOUNT_CUSTOM_FIELDS
        })

        let URL = '/contexts/Company?customOnly=true';

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_ACCOUNT_CUSTOM_FIELDS_SUCCESS,
                    data: response.data,
                    dataFetched: true
                })
            })
    }
}

export function postAccount(data, dispatch) {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    dispatch({
        type: types.POSTING_ACCOUNT
    });

    let METHOD = 'POST';
    let URL = '/companies';

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
}
