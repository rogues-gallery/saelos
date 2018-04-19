import Http from "../../utils/Http";
import * as actions from "./store/actions";

/**
 * Fetch the full team by id
 *
 * @returns {function(*)}
 */
export const fetchTeam = id => dispatch => {
  dispatch(actions.fetchingTeam());

  return Http.get(`teams/${id}`)
    .then(res => {
      dispatch(actions.fetchingTeamSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingTeamFailure());
    });
};

/**
 * Fetch a paginated list of team
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchTeams = params => dispatch => {
  dispatch(actions.fetchingTeams());

  params = params || {};

  return Http.get("teams", { params: params })
    .then(res => {
      dispatch(actions.fetchingTeamsSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingTeamsFailure());
    });
};

/**
 * Save a team
 *
 * @param params
 * @returns {function(*)}
 */
export const saveTeam = params => dispatch => {
  dispatch(actions.postingTeam());

  if (params.id) {
    return Http.patch(`teams/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingTeamSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingTeamFailure());
      });
  } else {
    return Http.post(`teams`, params)
      .then(res => {
        dispatch(actions.postingTeamSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingTeamFailure());
      });
  }
};

/**
 * Delete a team
 *
 * @param id
 * @returns {function(*)}
 */
export const deleteTeam = id => dispatch => {
  dispatch(actions.deletingTeam());

  return Http.delete(`teams/${id}`)
    .then(res => {
      dispatch(actions.deletingTeamSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingTeamFailure());
    });
};
