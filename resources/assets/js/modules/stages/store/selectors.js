import * as fromReducer from "./reducer";

export const getStages = state => fromReducer.getStages(state.stageState);

export const getStage = (state, id) =>
  fromReducer.getStage(state.stageState, id);

export const getSearchStringForStages = state =>
  fromReducer.getSearchStringForStages(state.stageState);

export const getPaginationForStages = state =>
  fromReducer.getPaginationForStages(state.stageState);
