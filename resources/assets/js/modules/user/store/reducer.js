import User from '../User'
import _ from 'lodash'
import { USER_UPDATE , USER_UNSET } from './action-types'
import { AUTH_LOGOUT, AUTH_USER } from '../../auth/store/action-types'

const initialState = {
  name: null,
  username: null,
  roles: [],
  team: {},
  settings: {
    views: []
  }
}

const reducer = (state = initialState, { type, data = null, payload = null }) => {
  switch (type) {
    case AUTH_USER:
      return authUser(state, payload)
    case USER_UPDATE:
      return updateUser(state, payload)
    case AUTH_LOGOUT:
    case USER_UNSET:
      return unsetUser()
    default:
      return state
  }
}

function updateUser(state, payload) {
  return {
    ...state,
    ...payload
  }
}

function unsetUser() {
  return initialState
}

function authUser(state, user) {
  return {
    ...state,
    ...user
  }
}

export default reducer

export const getUser = (state) => new User(state)
export const getTeam = (state) => getUser(state).team
export const getSettings = (state) => state.settings
export const getViews = (state, parentItem) => _.filter(getSettings(state).views, v => v.parentItem === parentItem)
