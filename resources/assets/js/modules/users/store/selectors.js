import * as fromReducer from "./reducer";
import filter from "lodash/filter";

export const getActiveUser = state =>
  fromReducer.getActiveUser(state.userState);

export const getUsers = state => fromReducer.getUsers(state.userState);

export const getUser = (state, id) => fromReducer.getUser(state.userState, id);

export const getSearchStringForUsers = state =>
  fromReducer.getSearchStringForUsers(state.userState);

export const getPaginationForUsers = state =>
  fromReducer.getPaginationForUsers(state.userState);

export const getFieldsForUsers = state =>
  filter(state.fieldState.data, f => f.model === "App\\User");

export const getSettings = state => fromReducer.getSettings(state.userState);

export const getViews = (state, parentItem) =>
  fromReducer.getViews(state.userState, parentItem);

export const inEdit = state => fromReducer.inEdit(state.userState);
