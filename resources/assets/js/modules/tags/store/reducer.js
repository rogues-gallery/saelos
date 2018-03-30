import * as types from './action-types';
import Tag from "../Tag";

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

export default function tagReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_TAGS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_TAG:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_TAGS_SUCCESS:
      let { data, meta } = action.data
      let newTagsForState

      if (data.length === 0) {
        return {
          ...state,
          isFetching: false
        }
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newTagsForState = data
      } else {
        newTagsForState = state.data

        data.map(t => {
          newTagsForState = injectTagIntoState(t, newTagsForState)
        })
      }

      return {
        ...state,
        data: newTagsForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_TAG_FAILURE:
    case types.FETCHING_TAGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_TAG:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_TAG_SUCCESS:
    case types.FETCHING_SINGLE_TAG_SUCCESS:
      const newData = injectTagIntoState(action.data, state.data)

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

const injectTagIntoState = (tag, data) => {
  const index = _.findIndex(data, (t) => t.id === parseInt(tag.id))

  if (index >= 0) {
    data[index] = tag
  } else {
    data.push(tag)
  }

  return data
}

export const getTags = (state) => state.data.map(t => new Tag(t))
export const getTag = (state, id) => {
  let tag = _.find(getTags(state), (t) => t.id === parseInt(id));

  if (typeof tag === 'undefined') {
    return new Tag({})
  }

  return tag;
}
export const getSearchStringForTags = (state) => state.searchString;
export const getPaginationForTags = (state) => state.meta;