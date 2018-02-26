import * as types from '../../../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    authenticated: true,
    user: {
        team: {}
    }
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.AUTH_USER:
            return {
                ...state,
                error: '',
                message: '',
                authenticated: true,
                user: action.data
            }
        case types.UNAUTH_USER:
            return {
                ...state,
                authenticated: false
            }
        case types.AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}