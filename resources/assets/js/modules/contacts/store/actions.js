import * as types from './action-types';

export const fetchingContact = () => ({
  type: types.FETCHING_SINGLE_CONTACT
})

export const fetchingContactSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_CONTACT_SUCCESS,
  data: payload
})

export const fetchingContactFailure = () => ({
  type: types.FETCHING_SINGLE_CONTACT_FAILURE
})

export const fetchingContacts = () => ({
  type: types.FETCHING_CONTACTS
})

export const fetchingContactsSuccess = (payload) => ({
  type: types.FETCHING_CONTACTS_SUCCESS,
  data: payload
})

export const fetchingContactsFailure = () => ({
  type: types.FETCHING_CONTACTS_FAILURE
})

export const postingContact = () => ({
  type: types.POSTING_CONTACT
})

export const postingContactSuccess = (payload) => ({
  type: types.POSTING_CONTACT_SUCCESS,
  data: payload
})

export const postingContactFailure = () => ({
  type: types.POSTING_CONTACT_FAILURE
})

export const deletingContact = () => ({
  type: types.DELETING_CONTACT
})

export const deletingContactSuccess = (payload) => ({
  type: types.DELETING_CONTACT_SUCCESS,
  data: payload
})

export const deletingContactFailure = () => ({
  type: types.DELETING_CONTACT_FAILURE
})

export const fetchingCustomFieldsForContacts = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS
})

export const fetchingCustomFieldsForContactsSuccess = (payload) => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS_SUCCESS,
  data: payload
})

export const fetchingCustomFieldsForContactsFailure = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS_FAILURE
})