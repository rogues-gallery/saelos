import * as types from './action-types';

export const fetchingUser = () => ({
  type: types.FETCHING_SINGLE_USER
})

export const fetchingUserSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_USER_SUCCESS,
  data: payload
})

export const fetchingUserFailure = () => ({
  type: types.FETCHING_SINGLE_USER_FAILURE
})

export const fetchingUsers = (payload) => ({
  type: types.FETCHING_USERS,
  data: payload
})

export const fetchingUsersSuccess = (payload) => ({
  type: types.FETCHING_USERS_SUCCESS,
  data: payload
})

export const fetchingUsersFailure = () => ({
  type: types.FETCHING_USERS_FAILURE
})

export const postingUser = () => ({
  type: types.POSTING_USER
})

export const postingUserSuccess = (payload) => ({
  type: types.POSTING_USER_SUCCESS,
  data: payload
})

export const postingUserFailure = () => ({
  type: types.POSTING_USER_FAILURE
})

export const deletingUser = () => ({
  type: types.DELETING_USER
})

export const deletingUserSuccess = (payload) => ({
  type: types.DELETING_USER_SUCCESS,
  data: payload
})

export const deletingUserFailure = () => ({
  type: types.DELETING_USER_FAILURE
})