import * as fromReducer from './reducer';

export const getOpportunities = (state) =>
    fromReducer.getOpportunities(state.opportunityState);

export const getOpportunity = (state, id) =>
    fromReducer.getOpportunity(state.opportunityState, id);

export const getPaginationForOpportunities = (state) =>
    fromReducer.getPaginationForOpportunities(state.opportunityState);