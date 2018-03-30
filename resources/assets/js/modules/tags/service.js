import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full stage by id
 *
 * @returns {function(*)}
 */
export const fetchTag = (id) => (dispatch) => {
  dispatch(actions.fetchingTag())

  return Http.get(`tags/${id}`)
    .then(res => {
      dispatch(actions.fetchingTagSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingTagFailure());
    })
}

/**
 * Fetch a paginated list of tags
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchTags = (params) => (dispatch) => {
  const { isFetching } = store.getState().stageState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingTags({
    ...params
  }));

  params = params || {}

  return Http.get('tags', {params: params})
    .then(res => {
      dispatch(actions.fetchingTagsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingTagsFailure())
    })
}

export const saveTag = (params) => (dispatch) => {
  dispatch(actions.postingTag());

  if (params.id) {
    return Http.patch(`tags/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingTagSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingTagFailure());
      })
  } else {
    return Http.post(`tags`, params)
      .then(res => {
        dispatch(actions.postingTagSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingTagFailure());
      })
  }
}

export const deleteTag = (id) => (dispatch) => {
  dispatch(actions.deletingTag());

  return Http.delete(`tags/${id}`)
    .then(res => {
      dispatch(actions.deletingTagSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingTagFailure())
    })
}