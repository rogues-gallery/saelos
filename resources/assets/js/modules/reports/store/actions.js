import * as types from './action-types';

export const fetchingReport = () => ({
  type: types.FETCHING_SINGLE_REPORT
})

export const fetchingReportSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_REPORT_SUCCESS,
  data: payload
})

export const fetchingReportFailure = () => ({
  type: types.FETCHING_SINGLE_REPORT_FAILURE
})

export const fetchingReports = () => ({
  type: types.FETCHING_REPORTS
})

export const fetchingReportsSuccess = (payload) => ({
  type: types.FETCHING_REPORTS_SUCCESS,
  data: payload
})

export const fetchingReportsFailure = () => ({
  type: types.FETCHING_REPORTS_FAILURE
})

export const postingReport = () => ({
  type: types.POSTING_REPORT
})

export const postingReportSuccess = (payload) => ({
  type: types.POSTING_REPORT_SUCCESS,
  data: payload
})

export const postingReportFailure = () => ({
  type: types.POSTING_REPORT_FAILURE
})

export const deletingReport = () => ({
  type: types.DELETING_REPORT
})

export const deletingReportSuccess = (payload) => ({
  type: types.DELETING_REPORT_SUCCESS,
  data: payload
})

export const deletingReportFailure = () => ({
  type: types.DELETING_REPORT_FAILURE
})