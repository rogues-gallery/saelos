import * as types from "./action-types";
import * as notifications from "../notifications";

export const fetchingContact = () => ({
  type: types.FETCHING_SINGLE_CONTACT
});

export const fetchingContactSuccess = payload => ({
  type: types.FETCHING_SINGLE_CONTACT_SUCCESS,
  data: payload
});

export const fetchingContactFailure = () => ({
  type: types.FETCHING_SINGLE_CONTACT_FAILURE
});

export const fetchingContacts = payload => {
  notifications.onFetchingContacts();

  return {
    type: types.FETCHING_CONTACTS,
    data: payload
  };
};

export const fetchingContactsSuccess = payload => {
  notifications.onFetchingContactsSuccess();

  return {
    type: types.FETCHING_CONTACTS_SUCCESS,
    data: payload
  };
};

export const fetchingContactsFailure = () => ({
  type: types.FETCHING_CONTACTS_FAILURE
});

export const fetchingContactCountSuccess = payload => {
  return {
    type: types.FETCHING_CONTACT_COUNT_SUCCESS,
    data: payload
  };
};

export const fetchingContactCountFailure = () => ({
  type: types.FETCHING_CONTACT_COUNT_FAILURE
});

export const postingContact = () => ({
  type: types.POSTING_CONTACT
});

export const postingContactSuccess = payload => {
  notifications.onContactSave(payload);

  return {
    type: types.POSTING_CONTACT_SUCCESS,
    data: payload
  };
};

export const postingContactFailure = () => ({
  type: types.POSTING_CONTACT_FAILURE
});

export const deletingContact = () => ({
  type: types.DELETING_CONTACT
});

export const deletingContactSuccess = payload => ({
  type: types.DELETING_CONTACT_SUCCESS,
  data: payload
});

export const deletingContactFailure = () => ({
  type: types.DELETING_CONTACT_FAILURE
});

export const fetchingCustomFieldsForContacts = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS
});

export const fetchingCustomFieldsForContactsSuccess = payload => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS_SUCCESS,
  data: payload
});

export const fetchingCustomFieldsForContactsFailure = () => ({
  type: types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS_FAILURE
});

export const emailingContact = () => ({
  type: types.EMAILING_CONTACT
});

export const emailingContactSuccess = payload => ({
  type: types.EMAILING_CONTACT_SUCCESS,
  data: payload
});

export const emailingContactFailure = () => ({
  type: types.EMAILING_CONTACT_FAILURE
});

export const editingContact = () => ({
  type: types.EDITING_CONTACT
});

export const editingContactFinished = () => ({
  type: types.EDITING_CONTACT_FINISHED
});

export const callingContact = () => ({
  type: types.CALLING_CONTACT
});

export const callingContactSuccess = payload => ({
  type: types.CALLING_CONTACT_SUCCESS,
  data: payload
});

export const callingContactFailure = () => ({
  type: types.CALLING_CONTACT_FAILURE
});
