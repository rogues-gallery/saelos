import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full workflow by id
 *
 * @returns {function(*)}
 */
export const fetchWorkflow = (id) => (dispatch) => {
    dispatch(actions.fetchingWorkflow());

    return Http.get(`workflows/${id}`)
        .then(res => {
            const data = Transformer.fetch(res.data.data)
            dispatch(actions.fetchingWorkflowSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.fetchingWorkflowFailure());
        })
}

/**
 * Fetch a paginated list of workflows
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchWorkflows = (params) => (dispatch) => {
    dispatch(actions.fetchingWorkflows());

    params = params || {}

    return Http.get('workflows', {params: params})
        .then(res => {
            const data = Transformer.fetch(res.data)
            dispatch(actions.fetchingWorkflowsSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.fetchingWorkflowsFailure())
        })
}

export const saveWorkflow = (params) => (dispatch) => {
    dispatch(actions.postingWorkflow());

    if (params.id) {
        return Http.patch(`workflows/${params.id}`, params)
            .then(res => {
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingWorkflowSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingWorkflowFailure());
            })
    } else {
        return Http.post(`workflows`, params)
            .then(res => {
                const data = Transformer.fetch(res.data)
                dispatch(actions.postingWorkflowSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.postingWorkflowFailure());
            })
    }
}

export const deleteWorkflow = (id) => (dispatch) => {
    dispatch(actions.deletingWorkflow());

    return Http.delete(`workflows/${id}`)
        .then(res => {
            const data = Transformer.fetch(res.data)
            dispatch(actions.deletingWorkflowSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.deletingWorkflowFailure())
        })
}