import * as types from '../actions/types';

let _ = require('lodash');

const initialState = {
    data: [],
    pagination: {},
    dataFetched: false,
    isFetching: false,
    error: false,
    singleAccount: {},
    search: {},
    accountUpdated: false
}

export default function workflowReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_WORKFLOWS:
            let query = action.hasOwnProperty('search') ? action.search : {};

            return {
                ...state,
                isFetching: true,
                search: query
            }
        case types.FETCHING_WORKFLOWS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data,
                pagination: action.pagination
            }
        case types.FETCHING_WORKFLOWS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case types.RECEIVED_WORKFLOW_UPDATE:
            let account = action.data;
            let alteredData = state.data;
            let accountIndex = _.findIndex(alteredData, {id: account.id});

            if (accountIndex >= 0) {
                alteredData.splice(accountIndex, 1, account);
            } else {
                alteredData.push(account);
            }

            return {
                ...state,
                data: alteredData,
                accountUpdated: true,
                error: false
            }
        default:
            return state
    }
}
