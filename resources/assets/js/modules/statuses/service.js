import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";

/**
 * Fetch the full status by id
 *
 * @returns {function(*)}
 */
export const fetchStatus = id => dispatch => {
  dispatch(actions.fetchingStatus());

  return Http.get(`statuses/${id}`)
    .then(res => {
      dispatch(actions.fetchingStatusSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingStatusFailure());
    });
};

/**
 * Fetch a paginated list of statuses
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchStatuses = params => dispatch => {
  const { isFetching } = store.getState().statusState;

  if (isFetching) {
    return;
  }

  dispatch(
    actions.fetchingStatuses({
      ...params
    })
  );

  params = params || {};

  return Http.get("statuses", { params: params })
    .then(res => {
      dispatch(actions.fetchingStatusesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingStatusesFailure());
    });
};

export const saveStatus = params => dispatch => {
  dispatch(actions.postingStatus());

  if (params.id) {
    return Http.patch(`statuses/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingStatusSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingStatusFailure());
      });
  } else {
    return Http.post(`statuses`, params)
      .then(res => {
        dispatch(actions.postingStatusSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingStatusFailure());
      });
  }
};

export const deleteStatus = id => dispatch => {
  dispatch(actions.deletingStatus());

  return Http.delete(`statuses/${id}`)
    .then(res => {
      dispatch(actions.deletingStatusSuccess(id));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingStatusFailure());
    });
};

export const restoreStatus = id => {
  store.dispatch(actions.restoringStatus());
  const params = { action: "restore" };

  return Http.patch(`statuses/${id}`, params)
    .then(res => {
      store.dispatch(actions.restoringStatusSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      store.dispatch(actions.restoringStatusFailure());
    });
};
