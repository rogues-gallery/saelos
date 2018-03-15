import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full activity by id
 *
 * @returns {function(*)}
 */
export const fetchActivity = (id) => (dispatch) => {
  dispatch(actions.fetchingActivity())

  return Http.get(`activities/${id}`)
    .then(res => {
      dispatch(actions.fetchingActivitySuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingActivityFailure());
    })
}

/**
 * Fetch a paginated list of activities
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchActivities = (params) => (dispatch) => {
  const { isFetching } = store.getState().stageState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingActivities({
    ...params
  }));

  params = params || {}

  return Http.get('activities', {params: params})
    .then(res => {
      dispatch(actions.fetchingActivitiesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingActivitiesFailure())
    })
}

export const saveActivity = (params) => (dispatch) => {
  dispatch(actions.postingActivity());

  if (params.id) {
    return Http.patch(`activities/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingActivitySuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingActivityFailure());
      })
  } else {
    return Http.post(`activities`, params)
      .then(res => {
        dispatch(actions.postingActivitySuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingActivityFailure());
      })
  }
}

export const deleteActivity = (id) => (dispatch) => {
  dispatch(actions.deletingActivity());

  return Http.delete(`activities/${id}`)
    .then(res => {
      dispatch(actions.deletingActivitySuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingActivityFailure())
    })
}