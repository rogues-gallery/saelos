import * as types from "./action-types";

export const fetchingUser = () => ({
  type: types.FETCHING_SINGLE_USER
});

export const fetchingUserSuccess = payload => ({
  type: types.FETCHING_SINGLE_USER_SUCCESS,
  data: payload
});

export const fetchingUserFailure = () => ({
  type: types.FETCHING_SINGLE_USER_FAILURE
});

export const fetchingUsers = payload => ({
  type: types.FETCHING_USERS,
  data: payload
});

export const fetchingUsersSuccess = payload => ({
  type: types.FETCHING_USERS_SUCCESS,
  data: payload
});

export const fetchingUsersFailure = () => ({
  type: types.FETCHING_USERS_FAILURE
});

export const fetchingQuotaCount = payload => ({
  type: types.FETCHING_USER_QUOTA,
  data: payload
});

export const fetchingQuotaCountSuccess = payload => ({
  type: types.FETCHING_USER_QUOTA_SUCCESS,
  data: payload
});

export const fetchingQuotaCountFailure = () => ({
  type: types.FETCHING_USER_QUOTA_FAILURE
});

export const postingUser = () => ({
  type: types.POSTING_USER
});

export const postingUserSuccess = payload => ({
  type: types.POSTING_USER_SUCCESS,
  data: payload
});

export const postingUserFailure = () => ({
  type: types.POSTING_USER_FAILURE
});

export const deletingUser = () => ({
  type: types.DELETING_USER
});

export const deletingUserSuccess = payload => ({
  type: types.DELETING_USER_SUCCESS,
  data: payload
});

export const deletingUserFailure = () => ({
  type: types.DELETING_USER_FAILURE
});

export const creatingUserView = () => ({
  type: types.CREATING_USER_VIEW
});

export const creatingUserViewSuccess = payload => ({
  type: types.CREATING_USER_VIEW_SUCCESS,
  data: payload
});

export const creatingUserViewFailure = () => ({
  type: types.CREATING_USER_VIEW_FAILURE
});

export const deletingUserView = () => ({
  type: types.DELETING_USER_VIEW
});

export const deletingUserViewSuccess = payload => ({
  type: types.DELETING_USER_VIEW_SUCCESS,
  data: payload
});

export const deletingUserViewFailure = () => ({
  type: types.DELETING_USER_VIEW_FAILURE
});

export const editingUser = () => ({
  type: types.EDITING_USER
});

export const editingUserFinished = () => ({
  type: types.EDITING_USER_FINISHED
});
