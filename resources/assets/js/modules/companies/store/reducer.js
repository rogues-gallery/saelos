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
  customFields : [],
  searchString: ''
}

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_COMPANIES:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_COMPANIES_SUCCESS:
      let { data, meta } = action.data
      let newCompaniesForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newCompaniesForState = data
      } else {
        newCompaniesForState = state.data

        data.map(c => {
          newCompaniesForState = injectCompaniesIntoState(c, newCompaniesForState)
        })
      }

      return {
        ...state,
        data: newCompaniesForState,
        meta: meta,
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
    case types.POSTING_COMPANY_SUCCESS:
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
    case types.DELETING_COMPANY_SUCCESS:
      const updatedData = removeCompanyFromState(action.data, state.data)

      return {
        ...state,
        data: updatedData
      }
    default:
      return state
  }
}

const injectCompaniesIntoState = (company, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(company.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], company)
  } else {
    data.push(company)
  }

  return data
}

const removeCompanyFromState = (id, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(id))

  if (index) {
    delete data[index]
  }

  return data
}

export const getCompanyIndex = (state, id) => _.findIndex(getCompanies(state), (c) => c.id === parseInt(id))
export const getCompany = (state, id) => {
  let company = _.find(getCompanies(state), (c) => c.id === parseInt(id));

  if (typeof company === 'undefined') {
    return new Company({})
  }

  return company
}
export const getCompanies = (state) => state.data.map(c => new Company(c))
export const getPaginationForCompanies = (state) => state.meta
export const getCustomFieldsForCompanies = (state) => state.customFields
export const isStateDirty = (state) => state.isPosting
export const getSearchStringForCompanies = (state) => state.searchString
export const getFirstCompanyId = (state) => state.data.length ? state.data[0].id : 0