import * as types from "./action-types";
import _ from "lodash";
import Analytics from "../Analytics";

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: "",
    perPage: 0,
    to: 0,
    total: 0
  },
  isFetching: false,
  isPosting: false,
  error: false,
  searchString: ""
};

export default function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ANALYTICS:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCHING_ANALYTICS_SUCCESS:
      let { data, meta } = action.data;
      let newAnalyticsForState;

      if (data.length === 0) {
        return state;
      }

      return {
        ...state,
        data: newAnalyticsForState,
        meta: meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_ANALYTICS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.FETCHING_SINGLE_REPORT_SUCCESS:
      const newData = injectAnalyticsIntoState(action.data, state.data);

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      };
    default:
      return state;
  }
}

export const getAnalytics = (state, id) => {
  if (typeof analytics === "undefined") {
    return new Analytics({});
  }

  return analytics;
};
