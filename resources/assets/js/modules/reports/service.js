import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full report by id
 *
 * @returns {function(*)}
 */
export const fetchReport = (id) => (dispatch) => {
  dispatch(actions.fetchingReport());

  return Http.get(`reports/${id}`)
    .then(res => {
      dispatch(actions.fetchingReportSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingReportFailure());
    })
}

/**
 * Fetch a paginated list of reports
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchReports = (params) => (dispatch) => {
  const { isFetching } = store.getState().reportState

  dispatch(actions.fetchingReports());

  params = params || {}

  return Http.get('reports', {params: params})
    .then(res => {
      dispatch(actions.fetchingReportsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingReportsFailure())
    })
}

/**
 * Save a report
 *
 * @param params
 * @returns {function(*)}
 */
export const saveReport = (params) => (dispatch) => {
  dispatch(actions.postingReport());

  if (params.id) {
    return Http.patch(`reports/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingReportSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingReportFailure());
      })
  } else {
    return Http.post(`reports`, params)
      .then(res => {
        dispatch(actions.postingReportSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingReportFailure());
      })
  }
}

/**
 * Delete a report
 *
 * @param id
 * @returns {function(*)}
 */
export const deleteReport = (id) => (dispatch) => {
  dispatch(actions.deletingReport());

  return Http.delete(`reports/${id}`)
    .then(res => {
      dispatch(actions.deletingReportSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingReportFailure())
    })
}