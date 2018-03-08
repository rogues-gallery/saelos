import Http from '../../utils/Http'
import * as actions from './store/actions'

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchOpportunity = (id) => (dispatch) => {
    dispatch(actions.fetchingOpportunity());

  Http.get(`contexts/Deal?customOnly=true`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForOpportunitiesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForOpportunitiesFailure());
    })

    return Http.get(`deals/${id}`)
        .then(res => {
            dispatch(actions.fetchingOpportunitySuccess(res.data.data))
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
            dispatch(actions.fetchingOpportunitiesSuccess(res.data))
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
                dispatch(actions.postingOpportunitySuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingOpportunityFailure());
            })
    } else {
        return Http.post(`deals`, params)
            .then(res => {
                dispatch(actions.postingOpportunitySuccess(res.data))
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
            dispatch(actions.deletingOpportunitySuccess(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.deletingOpportunityFailure())
        })
}