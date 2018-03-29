import * as fromReducer from './reducer';

export const getAnalytics = (state) =>
  fromReducer.getAnalytics(state.analyticsState);