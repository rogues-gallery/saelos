import * as types from '../actions/types';

let _ = require('lodash');

const initialState = {
    data: [],
    dataUpdated: false,
    dataAppended: false,
    entityId: 0,
    entityType: ''
}

export default function documentReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_DOCUMENTS_FOR_FLYOUT:
            return {
                ...state,
                data: action.data,
                dataUpdated: true,
                dataAppended: false,
                entityId: action.entityId,
                entityType: action.entityType
            }
        case types.CLEAR_DOCUMENTS_FOR_FLYOUT:
            return {
                ...state,
                data: [],
                dataUpdated: false,
                dataAppended: false,
                entityId: 0,
                entityType: ''
            }
        case types.APPEND_DOCUMENT_TO_FLYOUT:
            if (action.entityId === state.entityId && action.entityType === state.entityType) {
                let newData = state.data.slice(0);

                newData.unshift(action.data);

                return {
                    ...state,
                    data: newData,
                    dataUpdated: true,
                    dataAppended: true
                }
            } else {
                return state;
            }
        default:
            return state
    }
}
