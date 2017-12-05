import * as types from './types';
import fetch from '../utils/fetch';

export function fetchAccounts(page = 1) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_ACCOUNTS
        });

        let URL = '/companies?page=' + page;

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
