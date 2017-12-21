import * as types from './types';
import fetch from '../utils/fetch';

export function fetchContacts(page = 1, query = {}) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_CONTACTS,
            search: query
        });

        let URL = '/people?page=' + page;

        if (Object.keys(query).length) {
            Object.keys(query).map((key) => {
                URL = URL + '&' + key + '=' + query[key];
            });
        }

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_CONTACTS_SUCCESS,
                    data: response.data.data,
                    dataFetched: true,
                    pagination: response.data.meta
                });
            });
    }
}

export function fetchContact(id) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_SINGLE_CONTACT
        });

        let URL = '/people/' + id;

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_SINGLE_CONTACT_SUCCESS,
                    data: response.data.data,
                    dataFetched: true
                });
            });
    }
}

export function postContact(data, dispatch) {
    console.log(data);

    dispatch({
        type: types.POSTING_CONTACT
    });

    let METHOD = 'POST';
    let URL = '/people';

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
                type: types.POSTING_CONTACT_SUCCESS,
                data: response.data.data,
                dataFetched: true
            })
        });
}
