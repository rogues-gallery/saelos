import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full account by id
 *
 * @returns {function(*)}
 */
export const fetchAccount = (id) => (dispatch) => {
  dispatch(actions.fetchingAccount())
  dispatch(actions.fetchingCustomFieldsForAccounts())

  Http.get(`contexts/Company?customOnly=true`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForAccountsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForAccountsFailure())
    })

  return Http.get(`companies/${id}`)
    .then(res => {
      dispatch(actions.fetchingAccountSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingAccountFailure());
    })
}

/**
 * Fetch a paginated list of accounts
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchAccounts = (params) => (dispatch) => {
  dispatch(actions.fetchingAccounts());

  params = params || {}

  return Http.get('companies', {params: params})
    .then(res => {
      dispatch(actions.fetchingAccountsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingAccountsFailure())
    })
}

export const saveAccount = (params) => (dispatch) => {
  dispatch(actions.postingAccount());

  if (params.id) {
    return Http.patch(`companies/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingAccountSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingAccountFailure());
      })
  } else {
    return Http.post(`companies`, params)
      .then(res => {
        dispatch(actions.postingAccountSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingAccountFailure());
      })
  }
}

export const deleteAccount = (id) => (dispatch) => {
  dispatch(actions.deletingAccount());

  return Http.delete(`companies/${id}`)
    .then(res => {
      dispatch(actions.deletingAccountSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingAccountFailure())
    })
}