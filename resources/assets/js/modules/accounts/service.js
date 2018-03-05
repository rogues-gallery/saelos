import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full account by id
 *
 * @returns {function(*)}
 */
export const fetchAccount = (id) => (dispatch) => {
  dispatch(actions.fetchingAccount());

  return Http.get(`companies/${id}`)
    .then(res => {
      const data = Transformer.fetch(res.data.data)
      dispatch(actions.fetchingAccountSuccess(data))
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
      const data = Transformer.fetch(res.data)
      dispatch(actions.fetchingAccountsSuccess(data))
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
        const data = Transformer.fetch(res.data)
        dispatch(actions.postingAccountSuccess(data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingAccountFailure());
      })
  } else {
    return Http.post(`companies`, params)
      .then(res => {
        const data = Transformer.fetch(res.data)
        dispatch(actions.postingAccountSuccess(data))
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
      const data = Transformer.fetch(res.data)
      dispatch(actions.deletingAccountSuccess(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingAccountFailure())
    })
}