import * as types from './action-types';

export const fetchingTeam = () => ({
    type: types.FETCHING_SINGLE_TEAM
})

export const fetchingTeamSuccess = (payload) => ({
    type: types.FETCHING_SINGLE_TEAM_SUCCESS,
    data: payload
})

export const fetchingTeamFailure = () => ({
    type: types.FETCHING_SINGLE_TEAM_FAILURE
})

export const fetchingTeams = () => ({
    type: types.FETCHING_TEAMS
})

export const fetchingTeamsSuccess = (payload) => ({
    type: types.FETCHING_TEAMS_SUCCESS,
    data: payload
})

export const fetchingTeamsFailure = () => ({
    type: types.FETCHING_TEAMS_FAILURE
})

export const postingTeam = () => ({
    type: types.POSTING_TEAM
})

export const postingTeamSuccess = (payload) => ({
    type: types.POSTING_TEAM_SUCCESS,
    data: payload
})

export const postingTeamFailure = () => ({
    type: types.POSTING_TEAM_FAILURE
})

export const deletingTeam = () => ({
    type: types.DELETING_TEAM
})

export const deletingTeamSuccess = (payload) => ({
    type: types.DELETING_TEAM_SUCCESS,
    data: payload
})

export const deletingTeamFailure = () => ({
    type: types.DELETING_TEAM_FAILURE
})