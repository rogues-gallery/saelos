import * as types from './types';
import fetch from '../utils/fetch';

export function fetchReports(page = 1, query = {}) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_REPORTS,
            search: query
        });

        let URL = '/reports?page=' + page;

        if (Object.keys(query).length) {
            Object.keys(query).map((key) => {
                URL = URL + '&' + key + '=' + query[key];
            });
        }

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_REPORTS_SUCCESS,
                    data: response.data.data,
                    dataFetched: true,
                    pagination: response.data.meta
                });
            });
    }
}

export function fetchReport(id, page = 1) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_REPORT
        });

        let URL = '/reports/' + id + '?page=' + page;

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_REPORT_SUCCESS,
                    data: response.data,
                    dataFetched: true
                });
            });
    }
}

export function postReport(data, dispatch) {
    if (typeof data === 'undefined' || Object.keys(data).length === 0) {
        return;
    }

    dispatch({
        type: types.POSTING_ACCOUNT
    });

    let METHOD = 'POST';
    let URL = '/reports';

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
                type: types.POSTING_REPORT_SUCCESS,
                data: response.data.data,
                dataFetched: true
            })
        });
}
