import * as fromReducer from './reducer';

export const getWorkflows = (state) =>
    fromReducer.getWorkflows(state.workflowState);

export const getWorkflow = (state, id) =>
    fromReducer.getWorkflow(state.workflowState, id);

export const getPaginationForWorkflows = (state) =>
    fromReducer.getPaginationForWorkflows(state.workflowState);