import * as types from './action-types';
import _ from 'lodash';
import Report from '../Report';

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
  isPosting: false,
  error: false,
  searchString: ''
}

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_REPORTS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_SINGLE_REPORT:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_REPORTS_SUCCESS:
      let { data, meta } = action.data
      let newReportsForState
      
      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the reports in the app state
      if (meta.current_page === 1) {
        newReportsForState = data
      } else {
        newReportsForState = state.data

        data.map(r => {
          newReportsForState = injectReportIntoState(r, newReportsForState)
        })
      }

      return {
        ...state,
        data: newReportsForState,
        meta: meta,
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
      const newData = injectReportIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      }
    default:
      return state
  }
}

const injectReportIntoState = (report, data) => {
  const index = _.findIndex(data, (r) => r.id === parseInt(report.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], report)
  } else {
    data.push(report)
  }

  return data
}

export const getReportIndex = (state, id) => _.findIndex(getReports(state), (r) => r.id === parseInt(id))
export const getReport = (state, id) => {
  let report = _.find(getReports(state), (r) => r.id === parseInt(id));

  if (typeof report === 'undefined') {
    return new Report({})
  }

  return report
}
export const getReports = (state) => state.data;
export const getPaginationForReports = (state) => state.meta;
export const isStateDirty = (state) => state.isPosting || state.isFetching
export const getSearchStringForReports = (state) => state.searchString
export const getFirstReportId = (state) => state.data.length ? state.data[0].id : 0