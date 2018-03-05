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

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_REPORTS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_REPORTS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_REPORT_FAILURE:
    case types.FETCHING_REPORTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.FETCHING_SINGLE_REPORT_SUCCESS:
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

export const getReportIndex = (state, id) => _.findIndex(getReports(state), (c) => c.id === parseInt(id));
export const getReport = (state, id) => _.find(getReports(state), (c) => c.id === parseInt(id));
export const getReports = (state) => state.data;
export const getPaginationForReports = (state) => state.meta;