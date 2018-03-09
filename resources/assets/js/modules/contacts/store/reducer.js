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
  customFields : [],
  searchString: ''
}

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_CONTACTS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_CONTACT:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_CONTACTS_SUCCESS:
      let { data, meta } = action.data
      let newContactsForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newContactsForState = data
      } else {
        newContactsForState = state.data

        data.map(c => {
          newContactsForState = injectContactIntoState(c, newContactsForState)
        })
      }

      return {
        ...state,
        data: newContactsForState,
        meta: meta,
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
      const newData = injectContactIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
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

const injectContactIntoState = (contact, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(contact.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], contact)
  } else {
    data.push(contact)
  }

  return data
}

export const getContactIndex = (state, id) => _.findIndex(getContacts(state), (c) => c.id === parseInt(id));
export const getContact = (state, id) => {
  let contact = _.find(getContacts(state), (c) => c.id === parseInt(id));

  if (typeof contact === 'undefined') {
    return new Contact({})
  }

  return contact;
}
export const getContacts = (state) => state.data.map(c => new Contact(c))
export const getPaginationForContacts = (state) => state.meta;
export const getCustomFieldsForContacts = (state) => state.customFields;
export const isStateDirty = (state) => state.isPosting || state.isFetching;
export const getSearchStringForContacts = (state) => state.searchString;
export const getFirstContactId = (state) => state.data.length ? state.data[0].id : 0