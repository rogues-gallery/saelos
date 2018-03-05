import * as fromReducer from './reducer';

export const getReports = (state) =>
  fromReducer.getReports(state.reportState);

export const getReport = (state, id) =>
  fromReducer.getReport(state.reportState, id);

export const getPaginationForReports = (state) =>
  fromReducer.getPaginationForReports(state.reportState);