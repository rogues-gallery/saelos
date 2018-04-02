import * as fromReducer from './reducer'

export const getRoles = (state) =>
  fromReducer.getRoles(state.roleState)

export const getRole = (state, id) =>
  fromReducer.getRole(state.roleState, id)

export const getSearchStringForRoles = (state) =>
  fromReducer.getSearchStringForRoles(state.roleState);

export const getPaginationForRoles = (state) =>
  fromReducer.getPaginationForRoles(state.roleState);