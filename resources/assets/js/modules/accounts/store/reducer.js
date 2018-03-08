import * as types from './action-types';
import _ from 'lodash';
import Account from "../Account";

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: '',
    perPage: 0,
    to: 0,
    total: 0,
  },
  isFetching: false,
  isPosting: false,
  error: false,
  customFields : []
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ACCOUNTS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_ACCOUNT_FAILURE:
    case types.FETCHING_ACCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_ACCOUNT:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_ACCOuNT_SUCCESS:
    case types.FETCHING_SINGLE_ACCOUNT_SUCCESS:
      const index = _.findIndex(state.data, (a) => a.id === parseInt(action.data.id));

      if (index >= 0) {
        state.data[index] = action.data
      } else {
        state.data.push(action.data);
      }

      return {
        ...state,
        isFetching: false,
        error: false,
        isPosting: false
      }
    case types.FETCHING_CUSTOM_FIELDS_FOR_ACCOUNTS_SUCCESS:
      return {
        ...state,
        customFields: action.data
      }
    default:
      return state
  }
}

export const getAccountIndex = (state, id) => _.findIndex(getAccounts(state), (c) => c.id === parseInt(id));
export const getAccount = (state, id) => {
  let account = _.find(getAccounts(state), (c) => c.id === parseInt(id));

  if (typeof account === 'undefined') {
    return new Account({})
  }

  return new Account(account);
}
export const getAccounts = (state) => state.data;
export const getPaginationForAccounts = (state) => state.pagination;
export const getCustomFieldsForAccounts = (state) => state.customFields
export const isStateDirty = (state) => state.isPosting