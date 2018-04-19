import * as types from "./action-types";

export const fetchingRole = () => ({
  type: types.FETCHING_SINGLE_ROLE
});

export const fetchingRoleSuccess = payload => ({
  type: types.FETCHING_SINGLE_ROLE_SUCCESS,
  data: payload
});

export const fetchingRoleFailure = () => ({
  type: types.FETCHING_SINGLE_ROLE_FAILURE
});

export const fetchingRoles = () => ({
  type: types.FETCHING_ROLES
});

export const fetchingRolesSuccess = payload => ({
  type: types.FETCHING_ROLES_SUCCESS,
  data: payload
});

export const fetchingRolesFailure = () => ({
  type: types.FETCHING_ROLES_FAILURE
});

export const postingRole = () => ({
  type: types.POSTING_ROLE
});

export const postingRoleSuccess = payload => ({
  type: types.POSTING_ROLE_SUCCESS,
  data: payload
});

export const postingRoleFailure = () => ({
  type: types.POSTING_ROLE_FAILURE
});

export const deletingRole = () => ({
  type: types.DELETING_ROLE
});

export const deletingRoleSuccess = payload => ({
  type: types.DELETING_ROLE_SUCCESS,
  data: payload
});

export const deletingRoleFailure = () => ({
  type: types.DELETING_ROLE_FAILURE
});
