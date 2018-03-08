import * as types from './action-types';

export const fetchingOpportunity = () => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY
})

export const fetchingOpportunitySuccess = (payload) => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS,
  data: payload
})

export const fetchingOpportunityFailure = () => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY_FAILURE
})

export const fetchingOpportunities = () => ({
  type: types.FETCHING_OPPORTUNITIES
})

export const fetchingOpportunitiesSuccess = (payload) => ({
  type: types.FETCHING_OPPORTUNITIES_SUCCESS,
  data: payload
})

export const fetchingOpportunitiesFailure = () => ({
  type: types.FETCHING_OPPORTUNITIES_FAILURE
})

export const postingOpportunity = () => ({
  type: types.POSTING_OPPORTUNITY
})

export const postingOpportunitySuccess = (payload) => ({
  type: types.POSTING_OPPORTUNITY_SUCCESS,
  data: payload
})

export const postingOpportunityFailure = () => ({
  type: types.POSTING_OPPORTUNITY_FAILURE
})

export const deletingOpportunity = () => ({
  type: types.DELETING_OPPORTUNITY
})

export const deletingOpportunitySuccess = (payload) => ({
  type: types.DELETING_OPPORTUNITY_SUCCESS,
  data: payload
})

export const deletingOpportunityFailure = () => ({
  type: types.DELETING_OPPORTUNITY_FAILURE
})

export const fetchingCustomFieldsForOpportunities = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_OPPORTUNITIES
})

export const fetchingCustomFieldsForOpportunitiesSuccess = (payload) => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_OPPORTUNITIES_SUCCESS,
  data: payload
})

export const fetchingCustomFieldsForOpportunitiesFailure = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_OPPORTUNITIES_FAILURE
})