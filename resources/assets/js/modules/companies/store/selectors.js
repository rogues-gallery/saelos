import * as fromReducer from "./reducer";
import filter from "lodash/filter";

export const getCompanies = state =>
  fromReducer.getCompanies(state.companyState);

export const getCompany = (state, id) =>
  fromReducer.getCompany(state.companyState, id);

export const getPaginationForCompanies = state =>
  fromReducer.getPaginationForCompanies(state.companyState);

export const getCustomFieldsForCompanies = state =>
  filter(state.fieldState.data, f => f.model === "App\\Company");

export const isStateDirty = state =>
  fromReducer.isStateDirty(state.companyState);

export const getSearchStringForCompanies = state =>
  fromReducer.getSearchStringForCompanies(state.companyState);

export const getFirstCompanyId = state =>
  fromReducer.getFirstCompanyId(state.companyState);

export const isInEdit = state => fromReducer.isInEdit(state.companyState);

export const getCompanyError = state =>
  fromReducer.getCompanyError(state.companyState);
