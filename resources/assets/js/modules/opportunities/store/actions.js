import * as types from "./action-types";
import * as notifications from "../notifications";

export const fetchingOpportunity = () => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY
});

export const fetchingOpportunitySuccess = payload => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS,
  data: payload
});

export const fetchingOpportunityFailure = () => ({
  type: types.FETCHING_SINGLE_OPPORTUNITY_FAILURE
});

export const fetchingOpportunities = payload => {
  notifications.onFetchingOpportunities();

  return {
    type: types.FETCHING_OPPORTUNITIES,
    data: payload
  };
};

export const fetchingOpportunitiesSuccess = payload => {
  notifications.onFetchingOpportunitiesSuccess();

  return {
    type: types.FETCHING_OPPORTUNITIES_SUCCESS,
    data: payload
  };
};

export const fetchingOpportunitiesFailure = () => ({
  type: types.FETCHING_OPPORTUNITIES_FAILURE
});

export const postingOpportunity = () => ({
  type: types.POSTING_OPPORTUNITY
});

/* @TODO Why does opportunities require payload.data instead of just payload */

export const postingOpportunitySuccess = payload => {
  notifications.onOpportunitySave(payload);

  return {
    type: types.POSTING_OPPORTUNITY_SUCCESS,
    data: payload
  };
};

export const postingOpportunityFailure = () => ({
  type: types.POSTING_OPPORTUNITY_FAILURE
});

export const deletingOpportunity = () => ({
  type: types.DELETING_OPPORTUNITY
});

export const deletingOpportunitySuccess = payload => {
  notifications.onDeleteOpportunitySuccess(payload);

  return {
    type: types.DELETING_OPPORTUNITY_SUCCESS,
    data: payload
  };
};

export const restoringOpportunity = () => ({
  type: types.RESTORING_OPPORTUNITY
});

export const restoringOpportunitySuccess = payload => {
  notifications.onRestoreOpportunitySuccess(payload);

  return {
    type: types.RESTORING_OPPORTUNITY_SUCCESS,
    data: payload
  };
};

export const deletingOpportunityFailure = () => ({
  type: types.DELETING_OPPORTUNITY_FAILURE
});

export const editingOpportunity = () => ({
  type: types.EDITING_OPPORTUNITY
});

export const editingOpportunityFinished = () => ({
  type: types.EDITING_OPPORTUNITY_FINISHED
});
