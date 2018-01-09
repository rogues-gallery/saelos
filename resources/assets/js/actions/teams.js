import * as types from './types';
import fetch from '../utils/fetch';

export function fetchTeams(page = 1, query = {}) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_TEAMS,
            search: query
        });

        let URL = '/teams?page=' + page;

        if (Object.keys(query).length) {
            Object.keys(query).map((key) => {
                URL = URL + '&' + key + '=' + query[key];
            });
        }

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_TEAMS_SUCCESS,
                    data: response.data.data,
                    dataFetched: true,
                    pagination: response.data.meta
                });
            });
    }
}

export function fetchTeam(id) {
    return (dispatch) => {
        dispatch({
            type: types.FETCHING_TEAM
        });

        let URL = '/teams/' + id;

        fetch(URL)
            .then((response) => {
                dispatch({
                    type: types.FETCHING_TEAM_SUCCESS,
                    data: response.data.data,
                    dataFetched: true
                });
            });
    }
}
