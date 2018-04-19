import * as types from "./action-types";
import Activity from "../Activity";

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
  searchString: "",
  model: {},
  actionType: "create",
  open: false,
  minimized: false
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      };
    case types.FETCHING_SINGLE_ACTIVITY:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCHING_ACTIVITIES_SUCCESS:
      let { data, meta } = action.data;
      let newActivitiesForState;

      if (data.length === 0) {
        return {
          ...state,
          isFetching: false
        };
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newActivitiesForState = data;
      } else {
        newActivitiesForState = state.data;

        data.map(a => {
          newActivitiesForState = injectActivityIntoState(
            a,
            newActivitiesForState
          );
        });
      }

      return {
        ...state,
        data: newActivitiesForState,
        meta: meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_SINGLE_ACTIVITY_FAILURE:
    case types.FETCHING_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.POSTING_ACTIVITY:
      return {
        ...state,
        isPosting: true
      };
    case types.POSTING_ACTIVITY_SUCCESS:
    case types.FETCHING_SINGLE_ACTIVITY_SUCCESS:
      const newData = injectActivityIntoState(action.data, state.data);

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      };

    case types.OPEN_TASK_CONTAINER:
      return {
        ...state,
        ...action.data,
        open: true
      };
    case types.CLOSE_TASK_CONTAINER:
      return {
        ...state,
        model: initialState.model,
        open: initialState.open,
        minimized: initialState.minimized,
        actionType: initialState.actionType
      };
    case types.MINIMIZE_TASK_CONTAINER:
      return {
        ...state,
        minimized: !state.minimized
      };
    default:
      return state;
  }
}

const injectActivityIntoState = (activity, data) => {
  const index = _.findIndex(data, a => a.id === parseInt(activity.id));

  if (index >= 0) {
    data[index] = activity;
  } else {
    data.push(activity);
  }

  return data;
};

export const getActivities = state => state.data.map(a => new Activity(a));
export const getActivity = (state, id) => {
  let activity = _.find(getActivities(state), a => a.id === parseInt(id));

  if (typeof activity === "undefined") {
    return new Activity({});
  }

  return activity;
};
export const getSearchStringForActivities = state => state.searchString;
export const getPaginationForActivities = state => state.meta;
export const getFirstActivityId = state =>
  state.data.length ? state.data[0].id : 0;
export const getModel = state => state.model;
export const isOpen = state => state.open;
export const isMinimized = state => state.minimized;
export const getActionView = state => state.actionType;
