import * as types from './action-types'
import User from '../User'
import { AUTH_USER, AUTH_LOGOUT } from '../../auth/store/action-types'

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
  active: {
    name: '',
    username: '',
    settings: {
      views: []
    }
  },
  searchString: ''
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        active: action.data
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        active: Object.assign({}, initialState.active)
      }
    case types.FETCHING_USERS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_USER:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_USERS_SUCCESS:
      let { data, meta } = action.data
      let newUsersForState

      if (data.length === 0) {
        return {
          ...state,
          isFetching: false
        }
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newUsersForState = data
      } else {
        newUsersForState = state.data

        data.map(c => {
          newUsersForState = injectUserIntoState(c, newUsersForState)
        })
      }

      return {
        ...state,
        data: newUsersForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_USER_FAILURE:
    case types.FETCHING_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_USER:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_USER_SUCCESS:
    case types.FETCHING_SINGLE_USER_SUCCESS:
      const newData = injectUserIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false,
        activeUser: action.data.id === state.active.id ? action.data : state.active
      }
    default:
      return state
  }
}

const injectUserIntoState = (user, data) => {
  const index = _.findIndex(data, (u) => u.id === parseInt(user.id))

  if (index >= 0) {
    data[index] = user
  } else {
    data.push(user)
  }

  return data
}

export const getUsers = (state) => state.data.map(u => new User(u))
export const getUser = (state, id) => {
  let user = _.find(getUsers(state), (u) => u.id === parseInt(id));

  if (typeof user === 'undefined') {
    return new User({})
  }

  return user;
}
export const getSearchStringForUsers = (state) => state.searchString
export const getPaginationForUsers = (state) => state.meta

export const getActiveUser = (state) => new User(state.active)
export const getSettings = (state) => getActiveUser(state).settings
export const getViews = (state, parentItem) => _.filter(getSettings(state).views, v => v.parentItem === parentItem)