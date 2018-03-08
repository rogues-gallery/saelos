import * as types from './action-types';
import _ from 'lodash';
import Contact from "../Contact";

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

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_CONTACTS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_CONTACTS_SUCCESS:
      const newContacts = state.data.concat(action.data.data)

      return {
        ...state,
        data: newContacts,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_CONTACT_FAILURE:
    case types.FETCHING_CONTACTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_CONTACT:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_CONTACT_SUCCESS:
    case types.FETCHING_SINGLE_CONTACT_SUCCESS:
      const index = _.findIndex(state.data, (c) => c.id === parseInt(action.data.id));

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
    case types.FETCHING_CUSTOM_FIELDS_FOR_CONTACTS_SUCCESS:
      return {
        ...state,
        customFields: action.data
      }
    default:
      return state
  }
}

export const getContactIndex = (state, id) => _.findIndex(getContacts(state), (c) => c.id === parseInt(id));
export const getContact = (state, id) => {
  let contact = _.find(getContacts(state), (c) => c.id === parseInt(id));

  if (typeof contact === 'undefined') {
    return new Contact({})
  }

  return new Contact(contact);
}
export const getContacts = (state) => state.data;
export const getPaginationForContacts = (state) => state.meta;
export const getCustomFieldsForContacts = (state) => state.customFields;
export const isStateDirty = (state) => state.isPosting;