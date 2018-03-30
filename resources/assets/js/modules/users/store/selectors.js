import * as fromReducer from './reducer'

export const getUsers = (state) =>
  fromReducer.getUsers(state.userState)

export const getUser = (state, id) =>
  fromReducer.getUser(state.userState, id)

export const getSearchStringForUsers = (state) =>
  fromReducer.getSearchStringForUsers(state.userState);

export const getPaginationForUsers = (state) =>
  fromReducer.getPaginationForUsers(state.userState);