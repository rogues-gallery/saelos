import * as types from './types';
import fetch from '../utils/fetch';

export function fetchMembers() {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_MEMBERS
        });

        let URL = '/data/members.json';

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_MEMBERS_SUCCESS,
                    data: response.data,
                    dataFetched: true,
                    pagination: response.pagination
                });
            });
    }
}
