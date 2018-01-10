import * as types from '../actions/types';

let _ = require('lodash');

const initialState = {
    data: [],
    pagination: {},
    dataFetched: false,
    isFetching: false,
    singleReport: {},
    error: false,
    search: {},
}

export default function reportReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_REPORTS:
            let query = action.hasOwnProperty('search') ? action.search : {};

            return {
                ...state,
                isFetching: true,
                search: query
            }
        case types.FETCHING_REPORTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data,
                pagination: action.pagination
            }
        case types.FETCHING_REPORTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case types.FETCHING_REPORT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                singleReport: action.data,
                dataFetched: true
            }
            break;
        case types.FETCHING_REPORT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
