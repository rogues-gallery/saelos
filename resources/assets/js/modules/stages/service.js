import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full stage by id
 *
 * @returns {function(*)}
 */
export const fetchStage = (id) => (dispatch) => {
  dispatch(actions.fetchingStage())

  return Http.get(`stages/${id}`)
    .then(res => {
      dispatch(actions.fetchingStageSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingStageFailure());
    })
}

/**
 * Fetch a paginated list of stages
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchStages = (params) => (dispatch) => {
  const { isFetching } = store.getState().stageState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingStages({
    ...params
  }));

  params = params || {}

  return Http.get('stages', {params: params})
    .then(res => {
      dispatch(actions.fetchingStagesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingStagesFailure())
    })
}

export const saveStage = (params) => (dispatch) => {
  dispatch(actions.postingStage());

  if (params.id) {
    return Http.patch(`stages/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingStageSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingStageFailure());
      })
  } else {
    return Http.post(`stages`, params)
      .then(res => {
        dispatch(actions.postingStageSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingStageFailure());
      })
  }
}

export const deleteStage = (id) => (dispatch) => {
  dispatch(actions.deletingStage());

  return Http.delete(`stages/${id}`)
    .then(res => {
      dispatch(actions.deletingStageSuccess(id))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingStageFailure())
    })
}

export const restoreStage = (id) => {
  store.dispatch(actions.restoringStage());
  const params = {action: 'restore'}

  return Http.patch(`stages/${id}`, params)
    .then(res => {
      store.dispatch(actions.restoringStageSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      store.dispatch(actions.restoringStageFailure())
    })
}
