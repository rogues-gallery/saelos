import * as types from './types';
import fetch from '../utils/fetch';

export const postUser = (data) => (dispatch) => {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    dispatch({
        type: types.POSTING_USER
    });

    let METHOD = 'POST';
    let URL = '/users';

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
                type: types.POSTING_USER_SUCCESS,
                data: response.data.data,
                dataFetched: true
            })
        });
};

export const fetchRepCustomFields = () => (dispatch) => {
    dispatch({
        type: types.FETCHING_REP_CUSTOM_FIELDS
    })

    let URL = '/contexts/User?customOnly=true';

    fetch(URL)
        .then((response) => {
            dispatch({
                type: types.FETCHING_REP_CUSTOM_FIELDS_SUCCESS,
                data: response.data,
                dataFetched: true
            })
        });
}
