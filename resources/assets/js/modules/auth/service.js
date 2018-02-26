import Http from "../../utils/Http";
import { logoutUser, authUser } from "./store/actions";
import Transformer from "../../utils/Transformer";

export const isUserAuthenticated = () => (dispatch) => {
    fetch('/authenticated', {forAuth: true})
        .then((response) => {
            if (response.data.status) {
                return dispatch({
                    type: types.AUTH_USER,
                    data: response.data.status
                });
            } else {
                return logoutUser();
            }
        });
};

export const fetchUser = () => (dispatch) => {
    return Http.get('auth/user')
        .then(response => {
            const data = Transformer.fetch(response.data);
            dispatch(authUser(data));
        })
        .catch(error => {
            console.log(error);
        });
};