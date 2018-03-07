import Http from '../../utils/Http'
import * as actions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchContact = (id) => (dispatch) => {
  dispatch(actions.fetchingContact());
  dispatch(actions.fetchingCustomFieldsForContacts());

  Http.get(`contexts/Person?customOnly=true`)
    .then(res => {
      const data = Transformer.fetch(res.data)
      dispatch(actions.fetchingCustomFieldsForContactsSuccess(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForContactsFailure());
    })

  return Http.get(`people/${id}`)
    .then(res => {
      const data = Transformer.fetch(res.data.data)
      dispatch(actions.fetchingContactSuccess(data))
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
  dispatch(actions.fetchingContacts());

  params = params || {}

  return Http.get('people', {params: params})
    .then(res => {
      const data = Transformer.fetch(res.data)
      dispatch(actions.fetchingContactsSuccess(data))
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
        const data = Transformer.fetch(res.data)
        dispatch(actions.postingContactSuccess(data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingContactFailure());
      })
  } else {
    return Http.post(`people`, params)
      .then(res => {
        const data = Transformer.fetch(res.data)
        dispatch(actions.postingContactSuccess(data))
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
      const data = Transformer.fetch(res.data)
      dispatch(actions.deletingContactSuccess(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingContactFailure())
    })
}