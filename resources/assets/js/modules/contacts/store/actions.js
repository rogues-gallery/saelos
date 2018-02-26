import * as types from './types';
import fetch from '../utils/fetch';

export const fetchContacts = (page = 1, query = {}) => (dispatch) => {
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
};

export const fetchContact = (id) => (dispatch) => {
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
};

export const fetchContactCustomFields = () => (dispatch) => {
    dispatch({
        type: types.FETCHING_CONTACT_CUSTOM_FIELDS
    })

    let URL = '/contexts/Person?customOnly=true';

    fetch(URL)
        .then((response) => {
            dispatch({
                type: types.FETCHING_CONTACT_CUSTOM_FIELDS_SUCCESS,
                data: response.data,
                dataFetched: true
            })
        });
}

export const postContact = (data) => (dispatch) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

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
};

export const emailContact = (data) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    let METHOD = 'POST';
    let URL = '/people/' + data.id + '/email';

    let options = {
        body: data,
        method: METHOD
    }

    fetch(URL, options)
        .then((response) => {
            // noop
        });
};

export const callContact = (data) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    let METHOD = 'POST';
    let URL = '/plivo/send/call/' + data.id;

    let options = {
        body: data,
        method: METHOD,
        forAuth: true
    }

    fetch(URL, options)
        .then((response) => {
            // noop
        });
};

export const addContactNote = (data) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    let METHOD = 'POST';
    let URL = '/people/' + data.id + '/notes';

    let options = {
        body: data,
        method: METHOD
    }

    fetch(URL, options)
        .then((response) => {
            console.log(response);
        });
};

export const removeContact = (id) => {
    let METHOD = 'DELETE';
    let URL = '/people/' + id;

    let options = {
        body: {},
        method: METHOD
    }

    fetch(URL, options)
        .then((response) => {
            console.log(response);
        });
}
