import * as types from './action-types'
import Status from "../Status"

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

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_STATUSES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_STATUS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_STATUSES_SUCCESS:
      let { data, meta } = action.data
      let newStatusesForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newStatusesForState = data
      } else {
        newStatusesForState = state.data

        data.map(c => {
          newStatusesForState = injectStatusIntoState(c, newStatusesForState)
        })
      }

      return {
        ...state,
        data: newStatusesForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_STATUS_FAILURE:
    case types.FETCHING_STATUSES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_STATUS:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_STATUS_SUCCESS:
    case types.FETCHING_SINGLE_STATUS_SUCCESS:
      const newData = injectStatusIntoState(action.data, state.data)

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

const injectStatusIntoState = (status, data) => {
  const index = _.findIndex(data, (c) => c.id === parseInt(status.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], status)
  } else {
    data.push(status)
  }

  return data
}

export const getStatuses = (state) => state.data.map(s => new Status(s))
export const getStatus = (state, id) => {
  let stage = _.find(getStatuses(state), (s) => s.id === parseInt(id));

  if (typeof stage === 'undefined') {
    return new Status({})
  }

  return stage;
}
export const getSearchStringForStatuses = (state) => state.searchString;
export const getPaginationForStatuses = (state) => state.meta;