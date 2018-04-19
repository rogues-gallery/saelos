import * as fromReducer from "./reducer";

export const getOpportunities = state =>
  fromReducer.getOpportunities(state.opportunityState);

export const getOpportunity = (state, id) =>
  fromReducer.getOpportunity(state.opportunityState, id);

export const getPaginationForOpportunities = state =>
  fromReducer.getPaginationForOpportunities(state.opportunityState);

export const getCustomFieldsForOpportunities = state =>
  fromReducer.getCustomFieldsForOpportunities(state.opportunityState);

export const isStateDirty = state =>
  fromReducer.isStateDirty(state.opportunityState);

export const getSearchStringForOpportunities = state =>
  fromReducer.getSearchStringForOpportunities(state.opportunityState);

export const getFirstOpportunityId = state =>
  fromReducer.getFirstOpportunityId(state.opportunityState);

export const isInEdit = state => fromReducer.isInEdit(state.opportunityState);
