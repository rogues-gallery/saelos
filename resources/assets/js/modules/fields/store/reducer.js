import * as types from './action-types';
import Field from "../Field";

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
  searchString: ''
}

export default function fieldReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_FIELDS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_FIELD:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_FIELDS_SUCCESS:
      let { data, meta } = action.data
      let newFieldsForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newFieldsForState = data
      } else {
        newFieldsForState = state.data

        data.map(c => {
          newFieldsForState = injectFieldIntoState(c, newFieldsForState)
        })
      }

      return {
        ...state,
        data: newFieldsForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_FIELD_FAILURE:
    case types.FETCHING_FIELDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_FIELD:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_FIELD_SUCCESS:
    case types.FETCHING_SINGLE_FIELD_SUCCESS:
      const newData = injectFieldIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      }
    default:
      return state
  }
}

const injectFieldIntoState = (contact, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(contact.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], contact)
  } else {
    data.push(contact)
  }

  return data
}

export const getFields = (state) => state.data.map(s => new Field(s))
export const getField = (state, id) => {
  let stage = _.find(getFields(state), (s) => s.id === parseInt(id));

  if (typeof stage === 'undefined') {
    return new Field({})
  }

  return stage;
}
export const getSearchStringForFields = (state) => state.searchString;
export const getPaginationForFields = (state) => state.meta;