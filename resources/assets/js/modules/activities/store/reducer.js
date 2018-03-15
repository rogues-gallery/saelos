import * as types from './action-types';
import Activity from "../Activity";

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

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_ACTIVITY:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_ACTIVITIES_SUCCESS:
      let { data, meta } = action.data
      let newActivitysForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newActivitysForState = data
      } else {
        newActivitysForState = state.data

        data.map(c => {
          newActivitysForState = injectActivityIntoState(c, newActivitysForState)
        })
      }

      return {
        ...state,
        data: newActivitysForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_ACTIVITY_FAILURE:
    case types.FETCHING_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_ACTIVITY:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_ACTIVITY_SUCCESS:
    case types.FETCHING_SINGLE_ACTIVITY_SUCCESS:
      const newData = injectActivityIntoState(action.data, state.data)

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

const injectActivityIntoState = (contact, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(contact.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], contact)
  } else {
    data.push(contact)
  }

  return data
}

export const getActivities = (state) => state.data.map(s => new Activity(s))
export const getActivity = (state, id) => {
  let activity = _.find(getActivities(state), (s) => s.id === parseInt(id));

  if (typeof activity === 'undefined') {
    return new Activity({})
  }

  return activity;
}
export const getSearchStringForActivities = (state) => state.searchString;
export const getPaginationForActivities = (state) => state.meta;