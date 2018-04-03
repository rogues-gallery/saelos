import * as fromReducer from './reducer'

export const getUser = (state) =>
  fromReducer.getUser(state.user)

export const getTeam = (state) =>
  fromReducer.getTeam(state.user)

export const getSettings = (state) =>
  fromReducer.getSettings(state.user)

export const getViews = (state, parentItem) =>
  fromReducer.getViews(state.user, parentItem)