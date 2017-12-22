import * as types from '../actions/types';

const initialState = {
    data: [],
    pagination: {},
    dataFetched: false,
    isFetching: false,
    singleContact: {},
    error: false,
    search: {}
}

export default function contactReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_CONTACTS:
            let query = action.hasOwnProperty('search') ? action.search : {};

            return {
                ...state,
                isFetching: true,
                search: query
            }
        case types.FETCHING_CONTACTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data,
                pagination: action.pagination
            }
        case types.FETCHING_CONTACTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case types.FETCHING_SINGLE_CONTACT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                singleContact: action.data,
            }
        case types.FETCHING_SINGLE_CONTACT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
