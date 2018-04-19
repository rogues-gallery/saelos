import * as types from "./action-types";

export const fetchingAnalytics = payload => ({
  type: types.FETCHING_ANALYTICS,
  data: payload
});

export const fetchingAnalyticsSuccess = payload => ({
  type: types.FETCHING_ANALYTICS_SUCCESS,
  data: payload
});

export const fetchingAnalyticsFailure = () => ({
  type: types.FETCHING_ANALYTICS_FAILURE
});
