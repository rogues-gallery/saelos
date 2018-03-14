import * as fromReducer from './reducer'

export const getUser = (state) =>
	fromReducer.getUser(state.user)

export const getTeam = (state) =>
	fromReducer.getTeam(state.user)