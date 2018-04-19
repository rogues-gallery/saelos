import * as fromReducer from "./reducer";

export const getTags = state => fromReducer.getTags(state.tagState);

export const getTag = (state, id) => fromReducer.getTag(state.tagState, id);

export const getSearchStringForTags = state =>
  fromReducer.getSearchStringForTags(state.tagState);

export const getPaginationForTags = state =>
  fromReducer.getPaginationForTags(state.tagState);
