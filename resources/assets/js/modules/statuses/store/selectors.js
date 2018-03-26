import * as fromReducer from './reducer'

export const getStatuses = (state) =>
  fromReducer.getStatuses(state.statusState)

export const getStatus = (state, id) =>
  fromReducer.getStatus(state.statusState, id)

export const getSearchStringForStatuses = (state) =>
  fromReducer.getSearchStringForStatuses(state.statusState);

export const getPaginationForStatuses = (state) =>
  fromReducer.getPaginationForStatuses(state.statusState);