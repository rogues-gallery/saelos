import * as types from './action-types';

export const fetchingAccount = () => ({
  type: types.FETCHING_SINGLE_ACCOUNT
})

export const fetchingAccountSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_ACCOUNT_SUCCESS,
  data: payload
})

export const fetchingAccountFailure = () => ({
  type: types.FETCHING_SINGLE_ACCOUNT_FAILURE
})

export const fetchingAccounts = () => ({
  type: types.FETCHING_ACCOUNTS
})

export const fetchingAccountsSuccess = (payload) => ({
  type: types.FETCHING_ACCOUNTS_SUCCESS,
  data: payload
})

export const fetchingAccountsFailure = () => ({
  type: types.FETCHING_ACCOUNTS_FAILURE
})

export const postingAccount = () => ({
  type: types.POSTING_ACCOUNT
})

export const postingAccountSuccess = (payload) => ({
  type: types.POSTING_ACCOUNT_SUCCESS,
  data: payload
})

export const postingAccountFailure = () => ({
  type: types.POSTING_ACCOUNT_FAILURE
})

export const deletingAccount = () => ({
  type: types.DELETING_ACCOUNT
})

export const deletingAccountSuccess = (payload) => ({
  type: types.DELETING_ACCOUNT_SUCCESS,
  data: payload
})

export const deletingAccountFailure = () => ({
  type: types.DELETING_ACCOUNT_FAILURE
})
export const fetchingCustomFieldsForAccounts = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_ACCOUNTS
})

export const fetchingCustomFieldsForAccountsSuccess = (payload) => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_ACCOUNTS_SUCCESS,
  data: payload
})

export const fetchingCustomFieldsForAccountsFailure = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_ACCOUNTS_FAILURE
})