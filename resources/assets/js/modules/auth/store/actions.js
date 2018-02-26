import * as types from '../../../actions/types';
import fetch from '../../../utils/fetch';

export const loginUser = (data) => (dispatch) => {
    dispatch({type: types.AUTH_USER});
};

export const logoutUser = () => (dispatch) => {
    dispatch({type: types.UNAUTH_USER});
};