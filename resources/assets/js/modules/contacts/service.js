import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchContact = (id) => (dispatch) => {
  dispatch(actions.fetchingContact())

  return Http.get(`people/${id}`)
    .then(res => {
      dispatch(actions.fetchingContactSuccess(res.data.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingContactFailure());
    })
}

/**
 * Fetch a paginated list of contacts
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchContacts = (params) => (dispatch) => {
  const { isFetching } = store.getState().contactState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingCustomFieldsForContacts());

  Http.get(`contexts/Person?customOnly=true`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForContactsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForContactsFailure());
    })

  dispatch(actions.fetchingContacts({
    ...params
  }));

  params = params || {}

  return Http.get('people', {params: params})
    .then(res => {
      dispatch(actions.fetchingContactsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingContactsFailure())
    })
}

export const saveContact = (params) => (dispatch) => {
  dispatch(actions.postingContact());

  if (params.id) {
    return Http.patch(`people/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingContactSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingContactFailure());
      })
  } else {
    return Http.post(`people`, params)
      .then(res => {
        dispatch(actions.postingContactSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingContactFailure());
      })
  }
}

export const deleteContact = (id) => (dispatch) => {
  dispatch(actions.deletingContact());

  return Http.delete(`people/${id}`)
    .then(res => {
      dispatch(actions.deletingContactSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingContactFailure())
    })
}