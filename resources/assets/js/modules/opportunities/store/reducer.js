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

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_OPPORTUNITIES:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_OPPORTUNITY_FAILURE:
    case types.FETCHING_OPPORTUNITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS:
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

export const getOpportunityIndex = (state, id) => _.findIndex(getOpportunities(state), (c) => c.id === parseInt(id));
export const getOpportunity = (state, id) => _.find(getOpportunities(state), (c) => c.id === parseInt(id));
export const getOpportunities = (state) => state.data;
export const getPaginationForOpportunities = (state) => state.meta;