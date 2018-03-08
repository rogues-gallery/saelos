import * as fromReducer from './reducer';

export const getAccounts = (state) =>
  fromReducer.getAccounts(state.accountState);

export const getAccount = (state, id) =>
  fromReducer.getAccount(state.accountState, id);

export const getPaginationForAccounts = (state) =>
  fromReducer.getPaginationForAccounts(state.accountState);

export const getCustomFieldsForAccounts = (state) =>
  fromReducer.getCustomFieldsForAccounts(state.accountState);

export const isStateDirty = (state) =>
  fromReducer.isStateDirty(state.accountState);