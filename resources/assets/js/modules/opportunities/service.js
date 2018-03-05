import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchOpportunity = (id) => (dispatch) => {
    dispatch(actions.fetchingOpportunity());

    return Http.get(`deals/${id}`)
        .then(res => {
            const data = Transformer.fetch(res.data.data)
            dispatch(actions.fetchingOpportunitySuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.fetchingOpportunityFailure());
        })
}

/**
 * Fetch a paginated list of contacts
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchOpportunities = (params) => (dispatch) => {
    dispatch(actions.fetchingOpportunities());

    params = params || {}

    return Http.get('deals', {params: params})
        .then(res => {
            const data = Transformer.fetch(res.data)
            dispatch(actions.fetchingOpportunitiesSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.fetchingOpportunitiesFailure())
        })
}

export const saveOpportunity = (params) => (dispatch) => {
    dispatch(actions.postingOpportunity());

    if (params.id) {
        return Http.patch(`deals/${params.id}`, params)
            .then(res => {
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingOpportunitySuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingOpportunityFailure());
            })
    } else {
        return Http.post(`deals`, params)
            .then(res => {
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingOpportunitySuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingOpportunityFailure());
            })
    }
}

export const deleteOpportunity = (id) => (dispatch) => {
    dispatch(actions.deletingOpportunity());

    return Http.delete(`deals/${id}`)
        .then(res => {
            const data = Transformer.fetch(res.data)
            dispatch(actions.deletingOpportunitySuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.deletingOpportunityFailure())
        })
}