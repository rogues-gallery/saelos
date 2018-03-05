import * as fromReducer from './reducer';

export const getAccounts = (state) =>
  fromReducer.getAccounts(state.accountState);

export const getAccount = (state, id) =>
  fromReducer.getAccount(state.accountState, id);

export const getPaginationForAccounts = (state) =>
  fromReducer.getPaginationForAccounts(state.accountState);