import * as fromReducer from './reducer'

export const getActivities = (state) =>
  fromReducer.getActivities(state.activityState)

export const getActivity = (state, id) =>
  fromReducer.getActivity(state.activityState, id)

export const getSearchStringForActivities = (state) =>
  fromReducer.getSearchStringForActivities(state.activityState)

export const getPaginationForActivities = (state) =>
  fromReducer.getPaginationForActivities(state.activityState)