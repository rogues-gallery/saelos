import * as fromReducer from "./reducer";

export const getContacts = state => fromReducer.getContacts(state.contactState);

export const getContact = (state, id) =>
  fromReducer.getContact(state.contactState, id);

export const getPaginationForContacts = state =>
  fromReducer.getPaginationForContacts(state.contactState);

export const getCustomFieldsForContacts = state =>
  fromReducer.getCustomFieldsForContacts(state.contactState);

export const isStateDirty = state =>
  fromReducer.isStateDirty(state.contactState);

export const getSearchStringForContacts = state =>
  fromReducer.getSearchStringForContacts(state.contactState);

export const getFirstContactId = state =>
  fromReducer.getFirstContactId(state.contactState);

export const isInEdit = state => fromReducer.isInEdit(state.contactState);
