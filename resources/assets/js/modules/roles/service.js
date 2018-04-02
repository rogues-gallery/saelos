import Http from '../../utils/Http'
import * as actions from './store/actions'

/**
 * Fetch the full role by id
 *
 * @returns {function(*)}
 */
export const fetchRole = (id) => (dispatch) => {
  dispatch(actions.fetchingRole());

  return Http.get(`roles/${id}`)
    .then(res => {
      dispatch(actions.fetchingRoleSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingRoleFailure());
    })
}

/**
 * Fetch a paginated list of roles
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchRoles = (params) => (dispatch) => {
  dispatch(actions.fetchingRoles());

  params = params || {}

  return Http.get('roles', {params})
    .then(res => {
      dispatch(actions.fetchingRolesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingRolesFailure())
    })
}

/**
 * Save a role
 *
 * @param params
 * @returns {function(*)}
 */
export const saveRole = (params) => (dispatch) => {
  dispatch(actions.postingRole());

  if (params.id) {
    return Http.patch(`roles/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingRoleSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingRoleFailure());
      })
  } else {
    return Http.post(`roles`, params)
      .then(res => {
        dispatch(actions.postingRoleSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingRoleFailure());
      })
  }
}

/**
 * Delete a role
 *
 * @param id
 * @returns {function(*)}
 */
export const deleteRole = (id) => (dispatch) => {
  dispatch(actions.deletingRole());

  return Http.delete(`roles/${id}`)
    .then(res => {
      dispatch(actions.deletingRoleSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingRoleFailure())
    })
}