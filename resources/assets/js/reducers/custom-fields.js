import * as types from '../actions/types';

const initialState = {
    contactFields: {},
    accountFields: {},
    opportunityFields: {},
    isFetching: false,
    dataUpdated: false,
    error: false
}

export default function customFieldsReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCHING_CONTACT_CUSTOM_FIELDS:
        case types.FETCHING_OPPORTUNITY_CUSTOM_FIELDS:
        case types.FETCHING_ACCOUNT_CUSTOM_FIELDS:
            return {
                ...state,
                isFetching: true,
                dataUpdated: false,
            }
        case types.FETCHING_CONTACT_CUSTOM_FIELDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataUpdated: true,
                contactFields: action.data
            }
        case types.FETCHING_OPPORTUNITY_CUSTOM_FIELDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataUpdated: true,
                opportunityFields: action.data
            }
        case types.FETCHING_ACCOUNT_CUSTOM_FIELDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataUpdated: true,
                accountFields: action.data
            }
        case types.FETCHING_CONTACT_CUSTOM_FIELDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataUpdated: false,
                error: true
            }
        default:
            return state
    }
}
