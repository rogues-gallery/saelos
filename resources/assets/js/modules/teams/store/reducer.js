import * as types from './action-types';
import _ from 'lodash';
import Team from "../Team"

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
  error: false
}

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_TEAMS:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_TEAMS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_TEAM_FAILURE:
    case types.FETCHING_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.FETCHING_SINGLE_TEAM_SUCCESS:
      const index = _.findIndex(state.data, (c) => c.id === parseInt(action.data.id));

      if (index >= 0) {
        state.data[index] = action.data
      } else {
        state.data.push(action.data);
      }

      return {
        ...state,
        isFetching: false,
        error: false
      }
    default:
      return state
  }
}

export const getTeams = (state) => state.data.map(t => new Team(t))
export const getTeam = (state, id) => {
  let team = _.find(getTeams(state), (t) => t.id === parseInt(id));

  if (typeof team === 'undefined') {
    return new Team({})
  }

  return team;
}

export const getTeamIndex = (state, id) => _.findIndex(getTeams(state), (c) => c.id === parseInt(id));

export const getSearchStringForTeams = (state) => state.searchString;
export const getPaginationForTeams = (state) => state.meta;