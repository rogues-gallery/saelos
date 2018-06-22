import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";
import _ from "lodash";
import { getSettings, getActiveUser } from "../users/store/selectors";

/**
 * Fetch the full user by id
 *
 * @returns {function(*)}
 */
export const fetchUser = id => dispatch => {
  dispatch(actions.fetchingUser());

  return Http.get(`users/${id}`)
    .then(res => {
      dispatch(actions.fetchingUserSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingUserFailure());
    });
};

/**
 * Fetch a paginated list of users
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchUsers = params => dispatch => {
  const { isFetching } = store.getState().userState;

  if (isFetching) {
    return;
  }

  dispatch(
    actions.fetchingUsers({
      ...params
    })
  );

  params = params || {};

  return Http.get("users", { params })
    .then(res => {
      dispatch(actions.fetchingUsersSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingUsersFailure());
    });
};

export const fetchQuotaCount = id => dispatch => {
  dispatch(actions.fetchingQuotaCount(id));

  return Http.get(`users/${id}/count`)
    .then(res => {
      dispatch(actions.fetchingQuotaCountSuccess(res.data));
      return res.data;
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingQuotaCountFailure());
    });
};

export const saveUser = params => dispatch => {
  dispatch(actions.postingUser());

  if (params.id) {
    return Http.patch(`users/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingUserSuccess(res.data.data));
        return Promise.resolve(res.data.data);
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingUserFailure());
      });
  } else {
    return Http.post(`users`, params)
      .then(res => {
        dispatch(actions.postingUserSuccess(res.data.data));
        return Promise.resolve(res.data.data);
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingUserFailure());
      });
  }
};

export const deleteUser = id => dispatch => {
  dispatch(actions.deletingUser());

  return Http.delete(`users/${id}`)
    .then(res => {
      dispatch(actions.deletingUserSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingUserFailure());
    });
};

export const createView = params => dispatch => {
  dispatch(actions.creatingUserView());

  const state = store.getState();
  const { id, settings } = getActiveUser(state);

  if (typeof settings.views === "undefined") {
    settings.views = [];
  }

  settings.views.push(params);

  const submitData = {
    id,
    settings
  };

  dispatch(saveUser(submitData));
  dispatch(actions.creatingUserViewSuccess(params));
};

export const removeView = params => dispatch => {
  dispatch(actions.deletingUserView());

  const state = store.getState();
  const { id, settings } = getActiveUser(state);

  if (typeof settings.views === "undefined") {
    settings.views = [];
  }

  if (params.protected) {
    return;
  }

  settings.views = _.filter(
    settings.views,
    v =>
      v.parentItem !== params.parentItem ||
      v.searchString !== params.searchString
  );

  const submitData = {
    id,
    settings
  };

  dispatch(saveUser(submitData));
  dispatch(actions.deletingUserViewSuccess(params));
};

export const purchaseNumber = params => dispatch => {
  // @TODO: Dispatch a "purchasing number" action

  return Http.post(`users/${params.id}/purchaseNumber`, { params })
    .then(res => res.data)
    .catch(err => console.log(err));
};
