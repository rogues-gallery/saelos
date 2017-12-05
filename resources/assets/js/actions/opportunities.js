import * as types from './types';
import fetch from '../utils/fetch';

export function fetchOpportunities(page = 1) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_OPPORTUNITIES
        });

        let URL = '/deals?page=' + page;

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_OPPORTUNITIES_SUCCESS,
                    data: response.data.data,
                    dataFetched: true,
                    pagination: response.data.meta
                });
            });
    }
}
