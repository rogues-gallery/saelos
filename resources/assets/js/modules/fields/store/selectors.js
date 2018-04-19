import * as fromReducer from "./reducer";

export const getFields = state => fromReducer.getFields(state.fieldState);

export const getField = (state, id) =>
  fromReducer.getField(state.fieldState, id);

export const getSearchStringForFields = state =>
  fromReducer.getSearchStringForFields(state.fieldState);

export const getPaginationForFields = state =>
  fromReducer.getPaginationForFields(state.fieldState);
