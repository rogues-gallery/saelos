import * as fromReducer from "./reducer";
import filter from "lodash/filter";

export const getOpportunities = state =>
  fromReducer.getOpportunities(state.opportunityState);

export const getOpportunity = (state, id) =>
  fromReducer.getOpportunity(state.opportunityState, id);

export const getPaginationForOpportunities = state =>
  fromReducer.getPaginationForOpportunities(state.opportunityState);

export const getCustomFieldsForOpportunities = state =>
  filter(state.fieldState.data, f => f.model === "App\\Opportunity");

export const isStateDirty = state =>
  fromReducer.isStateDirty(state.opportunityState);

export const getSearchStringForOpportunities = state =>
  fromReducer.getSearchStringForOpportunities(state.opportunityState);

export const getFirstOpportunityId = state =>
  fromReducer.getFirstOpportunityId(state.opportunityState);

export const isInEdit = state => fromReducer.isInEdit(state.opportunityState);

export const getOpportunityError = state =>
  fromReducer.getOpportunityError(state.opportunityState);
