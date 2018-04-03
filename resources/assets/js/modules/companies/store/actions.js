import * as types from './action-types'
import * as notifications from '../notifications'

export const fetchingCompany = () => ({
  type: types.FETCHING_SINGLE_COMPANY
})

export const fetchingCompanySuccess = (payload) => ({
  type: types.FETCHING_SINGLE_COMPANY_SUCCESS,
  data: payload
})

export const fetchingCompanyFailure = () => ({
  type: types.FETCHING_SINGLE_COMPANY_FAILURE
})

export const fetchingCompanies = (payload) => {
  notifications.onFetchingCompanies()

  return {
    type: types.FETCHING_COMPANIES,
    data: payload
  }
}

export const fetchingCompaniesSuccess = (payload) => {
  notifications.onFetchingCompaniesSuccess(payload)
  return {
    type: types.FETCHING_COMPANIES_SUCCESS,
    data: payload
  }
}

export const fetchingCompaniesFailure = () => ({
  type: types.FETCHING_COMPANIES_FAILURE
})

export const postingCompany = () => ({
  type: types.POSTING_COMPANY
})

export const postingCompanySuccess = (payload) => {
  notifications.onCompanySave(payload)

  return {
    type: types.POSTING_COMPANY_SUCCESS,
    data: payload
  }
}

export const postingCompanyFailure = () => ({
  type: types.POSTING_COMPANY_FAILURE
})

export const deletingCompany = () => ({
  type: types.DELETING_COMPANY
})

export const deletingCompanySuccess = (payload) => {
  notifications.onDeleteCompanySuccess(payload)

  return {
    type: types.DELETING_COMPANY_SUCCESS,
    data: payload
  }
}

export const restoringCompany = () => ({
  type: types.RESTORING_COMPANY
})

export const restoringCompanySuccess = (payload) => {
  notifications.onRestoreCompanySuccess(payload)

  return {
    type: types.RESTORING_COMPANY_SUCCESS,
    data: payload
  }
}

export const deletingCompanyFailure = () => ({
  type: types.DELETING_COMPANY_FAILURE
})

export const fetchingCustomFieldsForCompanies = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_COMPANIES
})

export const fetchingCustomFieldsForCompaniesSuccess = (payload) => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_COMPANIES_SUCCESS,
  data: payload
})

export const fetchingCustomFieldsForCompaniesFailure = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_COMPANIES_FAILURE
})

export const editingCompany = () => ({
  type: types.EDITING_COMPANY
})

export const editingCompanyFinished = () => ({
  type: types.EDITING_COMPANY_FINISHED
})
