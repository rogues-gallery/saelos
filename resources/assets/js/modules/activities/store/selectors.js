import * as fromReducer from './reducer'

export const getActivities = (state) =>
  fromReducer.getActivities(state.activityState)

export const getActivity = (state, id) =>
  fromReducer.getActivity(state.activityState, id)

export const getSearchStringForActivities = (state) =>
  fromReducer.getSearchStringForActivities(state.activityState)

export const getPaginationForActivities = (state) =>
  fromReducer.getPaginationForActivities(state.activityState)

export const getFirstActivityId = (state) =>
  fromReducer.getFirstActivityId(state.activityState)

export const getModel = (state) =>
  fromReducer.getModel(state.activityState)

export const isOpen = (state) =>
  fromReducer.isOpen(state.activityState)

export const getActionView = (state) =>
  fromReducer.getActionView(state.activityState)