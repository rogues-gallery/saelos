import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full report by id
 *
 * @returns {function(*)}
 */
export const fetchReport = (id) => (dispatch) => {
    dispatch(actions.fetchingReport());

    return Http.get(`reports/${id}`)
        .then(res => {
            const data = Transformer.fetch(res.data.data)
            dispatch(actions.fetchingReportSuccess(data))
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
    dispatch(actions.fetchingReports());

    params = params || {}

    return Http.get('reports', {params: params})
        .then(res => {
            const data = Transformer.fetch(res.data)
            dispatch(actions.fetchingReportsSuccess(data))
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
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingReportSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingReportFailure());
            })
    } else {
        return Http.post(`reports`, params)
            .then(res => {
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingReportSuccess(data))
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
            const data = Transformer.fetch(res.data)
            dispatch(actions.deletingReportSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.deletingReportFailure())
        })
}