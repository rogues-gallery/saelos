import * as types from '../actions/types';

const initialState = {
    data: [],
    pagination: {},
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_ACCOUNTS:
            return {
                ...state,
                isFetching: true
            }
        case types.FETCHING_ACCOUNTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data,
                pagination: action.pagination
            }
        case types.FETCHING_ACCOUNTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
