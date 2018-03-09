import * as types from './action-types';
import _ from 'lodash';
import Company from "../Company";

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

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_COMPANIES:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_COMPANIES_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_COMPANY_FAILURE:
    case types.FETCHING_COMPANIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_COMPANY:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_ACCOuNT_SUCCESS:
    case types.FETCHING_SINGLE_COMPANY_SUCCESS:
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
    case types.FETCHING_CUSTOM_FIELDS_FOR_COMPANIES_SUCCESS:
      return {
        ...state,
        customFields: action.data
      }
    default:
      return state
  }
}

export const getCompanyIndex = (state, id) => _.findIndex(getCompanies(state), (c) => c.id === parseInt(id));
export const getCompany = (state, id) => {
  let company = _.find(getCompanies(state), (c) => c.id === parseInt(id));

  if (typeof company === 'undefined') {
    return new Company({})
  }

  return new Company(company);
}
export const getCompanies = (state) => state.data;
export const getPaginationForCompanies = (state) => state.pagination;
export const getCustomFieldsForCompanies = (state) => state.customFields
export const isStateDirty = (state) => state.isPosting