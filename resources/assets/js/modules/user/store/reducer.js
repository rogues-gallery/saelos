import * as types from '../actions/types';

const initialState = {
    data: {},
    isFetching: false,
    dataUpdated: false,
    error: false
}

export default function contactFlyoutReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_CONTACT_FOR_FLYOUT:
            return {
                ...state,
                isFetching: true,
                dataUpdated: false,
            }
        case types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataUpdated: true,
                data: action.data
            }
        case types.FETCHING_CONTACT_FOR_FLYOUT_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataUpdated: false,
                error: true
            }
        case types.CLEAR_CONTACT_FOR_FLYOUT:
            return {
                ...state,
                dataUpdated: false,
                data: {}
            }
        default:
            return state
    }
}
