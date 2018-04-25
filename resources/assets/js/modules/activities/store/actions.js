import * as types from "./action-types";

export const fetchingActivity = () => ({
  type: types.FETCHING_SINGLE_ACTIVITY
});

export const fetchingActivitySuccess = payload => ({
  type: types.FETCHING_SINGLE_ACTIVITY_SUCCESS,
  data: payload
});

export const fetchingActivityFailure = () => ({
  type: types.FETCHING_SINGLE_ACTIVITY_FAILURE
});

export const fetchingActivities = payload => ({
  type: types.FETCHING_ACTIVITIES,
  data: payload
});

export const fetchingActivitiesSuccess = payload => ({
  type: types.FETCHING_ACTIVITIES_SUCCESS,
  data: payload
});

export const fetchingActivitiesFailure = () => ({
  type: types.FETCHING_ACTIVITIES_FAILURE
});

export const postingActivity = () => ({
  type: types.POSTING_ACTIVITY
});

export const postingActivitySuccess = payload => ({
  type: types.POSTING_ACTIVITY_SUCCESS,
  data: payload
});

export const postingActivityFailure = () => ({
  type: types.POSTING_ACTIVITY_FAILURE
});

export const deletingActivity = () => ({
  type: types.DELETING_ACTIVITY
});

export const deletingActivitySuccess = payload => ({
  type: types.DELETING_ACTIVITY_SUCCESS,
  data: payload
});

export const deletingActivityFailure = () => ({
  type: types.DELETING_ACTIVITY_FAILURE
});

export const openTaskContainer = (model, actionType = "create", id = null) => ({
  type: types.OPEN_TASK_CONTAINER,
  data: {
    model,
    actionType,
    id
  }
});

export const closeTaskContainer = () => ({
  type: types.CLOSE_TASK_CONTAINER
});

export const minimizeTaskContainer = () => ({
  type: types.MINIMIZE_TASK_CONTAINER
});
