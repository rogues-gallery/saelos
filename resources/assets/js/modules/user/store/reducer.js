import User from '../User'
import { USER_UPDATE , USER_UNSET } from './action-types'
import { AUTH_LOGOUT, AUTH_USER } from '../../auth/store/action-types'

const initialState = {
  name: null,
  username: null,
  roles: [],
  team: {}
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTH_USER:
      return authUser(state, payload)
    case USER_UPDATE:
      return updateUser(state, payload);
    case AUTH_LOGOUT:
    case USER_UNSET:
      return unsetUser(state);
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
export const getViews = (state) => getUser(state).views