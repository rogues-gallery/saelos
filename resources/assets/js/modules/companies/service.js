import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full company by id
 *
 * @returns {function(*)}
 */
export const fetchCompany = (id) => (dispatch) => {
  dispatch(actions.fetchingCompany())
  dispatch(actions.fetchingCustomFieldsForCompanies())



  return Http.get(`companies/${id}`)
    .then(res => {
      dispatch(actions.fetchingCompanySuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCompanyFailure());
    })
}

/**
 * Fetch a paginated list of companies
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchCompanies = (params) => (dispatch) => {
  const { isFetching } = store.getState().companyState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingCustomFieldsForCompanies());

  Http.get(`contexts/Company?customOnly=true`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForCompaniesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForCompaniesFailure())
    })

  dispatch(actions.fetchingCompanies({
    ...params
  }));

  params = params || {}

  return Http.get('companies', {params: params})
    .then(res => {
      dispatch(actions.fetchingCompaniesSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCompaniesFailure())
    })
}

export const saveCompany = (params) => (dispatch) => {
  dispatch(actions.postingCompany());

  if (params.id) {
    return Http.patch(`companies/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingCompanySuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingCompanyFailure());
      })
  } else {
    return Http.post(`companies`, params)
      .then(res => {
        dispatch(actions.postingCompanySuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingCompanyFailure());
      })
  }
}

export const deleteCompany = (id) => (dispatch) => {
  dispatch(actions.deletingCompany());

  return Http.delete(`companies/${id}`)
    .then(res => {
      dispatch(actions.deletingCompanySuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingCompanyFailure())
    })
}