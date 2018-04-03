import User from '../User'
import _ from 'lodash'
import { USER_UPDATE , USER_UNSET } from './action-types'
import { AUTH_LOGOUT, AUTH_USER } from '../../auth/store/action-types'
import {CREATING_USER_VIEW_SUCCESS, DELETING_USER_VIEW_SUCCESS} from '../../users/store/action-types'

const initialState = {
  name: null,
  username: null,
  roles: [],
  team: {},
  views: [
    {
      searchString: 'assignee:me',
      linkText: 'Assigned to me',
      color: '#b21e22',
      parentItem: 'contacts'
    }
  ]
}

const reducer = (state = initialState, { type, data = null, payload = null }) => {
  switch (type) {
    case AUTH_USER:
      return authUser(state, payload)
    case USER_UPDATE:
      return updateUser(state, payload);
    case AUTH_LOGOUT:
    case USER_UNSET:
      return unsetUser(state);
    case CREATING_USER_VIEW_SUCCESS:
      const { views } = state

      views.push(data)

      return {
        ...state,
        views
      }
    case DELETING_USER_VIEW_SUCCESS:
      return {
        ...state,
        views: _.filter(state.views, v => v.searchString !== data.searchString && v.parentItem !== data.parentItem)
      }
    default:
      return state
  }
}

function updateUser(state, payload) {
  return {
    ...state, ...payload
  }
}

function unsetUser(state) {
  return {
    ...state, initialState
  }
}

function authUser(state, user) {
  return {
    ...state, ...user
  }
}

export default reducer

export const getUser = (state) => new User(state)
export const getTeam = (state) => getUser(state).team
export const getViews = (state, parentItem) => _.filter(getUser(state).views, v => v.parentItem === parentItem)
