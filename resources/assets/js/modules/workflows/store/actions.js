import * as types from './action-types';

export const fetchingWorkflow = () => ({
    type: types.FETCHING_SINGLE_WORKFLOW
})

export const fetchingWorkflowSuccess = (payload) => ({
    type: types.FETCHING_SINGLE_WORKFLOW_SUCCESS,
    data: payload
})

export const fetchingWorkflowFailure = () => ({
    type: types.FETCHING_SINGLE_WORKFLOW_FAILURE
})

export const fetchingWorkflows = () => ({
    type: types.FETCHING_WORKFLOWS
})

export const fetchingWorkflowsSuccess = (payload) => ({
    type: types.FETCHING_WORKFLOWS_SUCCESS,
    data: payload
})

export const fetchingWorkflowsFailure = () => ({
    type: types.FETCHING_WORKFLOWS_FAILURE
})

export const postingWorkflow = () => ({
    type: types.POSTING_WORKFLOW
})

export const postingWorkflowSuccess = (payload) => ({
    type: types.POSTING_WORKFLOW_SUCCESS,
    data: payload
})

export const postingWorkflowFailure = () => ({
    type: types.POSTING_WORKFLOW_FAILURE
})

export const deletingWorkflow = () => ({
    type: types.DELETING_WORKFLOW
})

export const deletingWorkflowSuccess = (payload) => ({
    type: types.DELETING_WORKFLOW_SUCCESS,
    data: payload
})

export const deletingWorkflowFailure = () => ({
    type: types.DELETING_WORKFLOW_FAILURE
})