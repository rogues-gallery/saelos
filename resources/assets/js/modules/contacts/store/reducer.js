import * as types from "./action-types";
import {
  DELETING_NOTE_SUCCESS,
  POSTING_NOTE_SUCCESS
} from "../../notes/store/action-types";
import _ from "lodash";
import Contact from "../Contact";
import { CALLING_CONTACT_SUCCESS } from "./action-types";
import { POSTING_TAG_SUCCESS } from "../../tags/store/action-types";

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: "",
    perPage: 0,
    to: 0,
    total: 0
  },
  isFetching: false,
  isPosting: false,
  error: false,
  searchString: "",
  inEdit: false
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case types.EDITING_CONTACT:
      return {
        ...state,
        inEdit: true
      };
    case types.EDITING_CONTACT_FINISHED:
      return {
        ...state,
        inEdit: false
      };
    case types.FETCHING_CONTACTS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.hasOwnProperty("searchString")
          ? action.data.searchString
          : ""
      };
    case types.FETCHING_SINGLE_CONTACT:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCHING_CONTACTS_SUCCESS:
      let { data, meta } = action.data;
      let newContactsForState;

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newContactsForState = data;
      } else {
        newContactsForState = state.data;

        data.map(c => {
          newContactsForState = injectContactIntoState(c, newContactsForState);
        });
      }

      return {
        ...state,
        data: newContactsForState,
        meta: meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_SINGLE_CONTACT_FAILURE:
    case types.FETCHING_CONTACTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.POSTING_CONTACT:
      return {
        ...state,
        isPosting: true
      };
    case types.POSTING_CONTACT_SUCCESS:
      const newData = injectContactIntoState(action.data, state.data);

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false,
        inEdit: false
      };
    case types.POSTING_CONTACT_FAILURE:
      return {
        ...state,
        error: action.data
      };
    case types.FETCHING_SINGLE_CONTACT_SUCCESS:
      const newNewData = injectContactIntoState(action.data, state.data);

      return {
        ...state,
        data: newNewData,
        isFetching: false,
        error: false,
        isPosting: false
      };
    case types.DELETING_CONTACT_SUCCESS:
      const updatedData = removeContactFromState(action.data, state.data);

      return {
        ...state,
        data: updatedData
      };
    case DELETING_NOTE_SUCCESS:
    case POSTING_NOTE_SUCCESS:
      const { entity_type, entity_id } = action.data.data;

      if (entity_type !== "App\\Contact") {
        return state;
      }

      const contact = _.find(state.data, c => c.id === entity_id);

      if (!contact.id) {
        return state;
      }

      if (action.type === DELETING_NOTE_SUCCESS) {
        contact.notes = _.filter(
          contact.notes,
          n => n.id !== action.data.data.id
        );
      } else {
        const noteIndex = _.findIndex(
          contact.notes,
          n => n.id === action.data.data.id
        );

        if (noteIndex >= 0) {
          contact.notes[noteIndex] = action.data.data;
        } else {
          contact.notes.unshift(action.data.data);
        }
      }

      const updatedDataWithNotes = injectContactIntoState(contact, state.data);

      return {
        ...state,
        data: updatedDataWithNotes
      };
    case CALLING_CONTACT_SUCCESS:
      const { activity } = action.data;

      const contactFromState = _.find(
        state.data,
        c => c.id === activity.contact[0].id
      );

      if (!contactFromState) {
        return state;
      }

      contactFromState.activities.push(activity);

      const updatedDataWithActivity = injectContactIntoState(
        contactFromState,
        state.data
      );

      return {
        ...state,
        data: updatedDataWithActivity
      };
    case POSTING_TAG_SUCCESS:
      const { contacts } = action.data;
      let updatedDataWithTags = state.data;

      if (contacts.length === 0) {
        return state;
      }

      contacts.forEach(c => {
        const thisContact = _.findIndex(state.data, sc => sc.id === c.id);

        if (thisContact >= 0) {
          const actualContact = state.data[thisContact];
          const foundTag = _.findIndex(
            actualContact.tags,
            t => t.id === action.data.id
          );

          if (foundTag >= 0) {
            actualContact.tags[foundTag] = action.data;
          } else {
            actualContact.tags.push(action.data);
          }

          updatedDataWithTags = injectContactIntoState(
            actualContact,
            updatedDataWithTags
          );
        }
      });

      return {
        ...state,
        data: updatedDataWithTags
      };
    default:
      return state;
  }
}

const injectContactIntoState = (contact, data) => {
  const index = _.findIndex(data, c => c.id === parseInt(contact.id));

  if (index >= 0) {
    data[index] = contact;
  } else {
    data.push(contact);
  }

  return data;
};

const removeContactFromState = (id, data) => {
  _.remove(data, c => c.id === parseInt(id));

  return data;
};

export const getContactIndex = (state, id) =>
  _.findIndex(getContacts(state), c => c.id === parseInt(id));
export const getContact = (state, id) => {
  let contact = _.find(getContacts(state), c => c.id === parseInt(id));

  if (typeof contact === "undefined") {
    return new Contact();
  }

  return contact;
};
export const getContacts = state => state.data.map(c => new Contact(c));
export const getPaginationForContacts = state => state.meta;
export const isStateDirty = state => state.isPosting || state.isFetching;
export const getSearchStringForContacts = state => state.searchString;
export const getFirstContactId = state =>
  state.data.length ? state.data[0].id : 0;
export const isInEdit = state => state.inEdit;
export const getContactError = state => state.error;
