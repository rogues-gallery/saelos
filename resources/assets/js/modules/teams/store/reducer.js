import { FETCHING_TEAM, FETCHING_TEAM_SUCCESS, FETCHING_TEAM_FAILURE } from './action-types';

const initialState = {
    data: [],
    pagination: {},
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_TEAM:
            return {
                ...state,
                isFetching: true
            }
        case FETCHING_TEAM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data
            }
        case FETCHING_TEAM_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
