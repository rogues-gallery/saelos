import * as types from './action-types';
import _ from 'lodash';

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: '',
    perPage: 0,
    to: 0,
    total: 0,
  },
  isFetching: false,
  error: false
}

export default function workflowReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_WORKFLOWS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_WORKFLOWS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_WORKFLOW_FAILURE:
    case types.FETCHING_WORKFLOWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.FETCHING_SINGLE_WORKFLOW_SUCCESS:
      const index = _.findIndex(state.data, (c) => c.id === parseInt(action.data.id));

      if (index >= 0) {
        state.data[index] = action.data
      } else {
        state.data.push(action.data);
      }

      return {
        ...state,
        isFetching: false,
        error: false
      }
    default:
      return state
  }
}

export const getWorkflowIndex = (state, id) => _.findIndex(getWorkflows(state), (c) => c.id === parseInt(id));
export const getWorkflow = (state, id) => _.find(getWorkflows(state), (c) => c.id === parseInt(id));
export const getWorkflows = (state) => state.data;
export const getPaginationForWorkflows = (state) => state.meta;