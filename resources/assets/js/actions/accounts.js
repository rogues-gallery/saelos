import * as types from './types';
import fetch from '../utils/fetch';

export function fetchAccounts(page = 1) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_ACCOUNTS
        });

        let URL = '/companies?page=' + page;

        fetch(URL)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: types.FETCHING_ACCOUNTS_SUCCESS,
                    data: response['hydra:member'],
                    dataFetched: true,
                    pagination: response['hydra:view']
                });
            });
    }
}
