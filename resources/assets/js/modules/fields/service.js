import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full field by id
 *
 * @returns {function(*)}
 */
export const fetchField = (id) => (dispatch) => {
  dispatch(actions.fetchingField())

  return Http.get(`fields/${id}`)
    .then(res => {
      dispatch(actions.fetchingFieldSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingFieldFailure());
    })
}

/**
 * Fetch a paginated list of fields
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchFields = (params) => (dispatch) => {
  const { isFetching } = store.getState().fieldState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingFields({
    ...params
  }));

  params = params || {}

  return Http.get('fields', {params: params})
    .then(res => {
      dispatch(actions.fetchingFieldsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingFieldsFailure())
    })
}

export const saveField = (params) => (dispatch) => {
  dispatch(actions.postingField());

  if (params.id) {
    return Http.patch(`fields/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingFieldSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingFieldFailure());
      })
  } else {
    return Http.post(`fields`, params)
      .then(res => {
        dispatch(actions.postingFieldSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingFieldFailure());
      })
  }
}

export const deleteField = (id) => (dispatch) => {
  dispatch(actions.deletingField())

  return Http.delete(`fields/${id}`)
    .then(res => {
      dispatch(actions.deletingFieldSuccess(id))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingFieldFailure())
    })
}

export const restoreField = (id) => {
  store.dispatch(actions.restoringField())
  const params = {action: 'restore'}

  return Http.patch(`fields/${id}`, params)
    .then(res => {
      store.dispatch(actions.restoringFieldSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      store.dispatch(actions.restoringFieldFailure())
    })
}
