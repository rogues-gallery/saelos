import * as fromReducer from './reducer';

export const getCompanies = (state) =>
  fromReducer.getCompanies(state.companyState);

export const getCompany = (state, id) =>
  fromReducer.getCompany(state.companyState, id);

export const getPaginationForCompanies = (state) =>
  fromReducer.getPaginationForCompanies(state.companyState);

export const getCustomFieldsForCompanies = (state) =>
  fromReducer.getCustomFieldsForCompanies(state.companyState);

export const isStateDirty = (state) =>
  fromReducer.isStateDirty(state.companyState);

 export const getSearchStringForCompanies = (state) =>
 	fromReducer.getSearchStringForCompanies(state.companyState);

 export const getFirstCompanyId = (state) =>
 	fromReducer.getFirstCompanyId(state.companyState);