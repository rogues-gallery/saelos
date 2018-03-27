import Http from '../../utils/Http'
import * as actions from './store/actions'
import store from '../../store'
import { getCustomFieldsForContacts } from "./store/selectors";
import { parseSearchString } from '../../utils/helpers'
import {NotificationManager} from 'react-notifications'

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchContact = (id) => (dispatch) => {
  dispatch(actions.fetchingContact())

  return Http.get(`contacts/${id}`)
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
  const state = store.getState()
  const { isFetching } = state.contactState;

  if (isFetching) {
    return
  }

  dispatch(actions.fetchingContacts({
    ...params
  }));

  params = Object.assign({}, params || {})

  params.searchParams = parseSearchString(params.searchString, getCustomFieldsForContacts(state))

  delete params.searchString

  return Http.get('contacts', {params})
    .then(res => {
      dispatch(actions.fetchingContactsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingContactsFailure())
    })
}

export const fetchContactFields = () => (dispatch) => {
  dispatch(actions.fetchingCustomFieldsForContacts());

  return Http.get(`contexts/Contact`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForContactsSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.fetchingCustomFieldsForContactsFailure());
    })
}

export const saveContact = (params) => (dispatch) => {
  dispatch(actions.postingContact());

  if (params.id) {
    return Http.patch(`contacts/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingContactSuccess(res.data.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.postingContactFailure());
      })
  } else {
    return Http.post(`contacts`, params)
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

  return Http.delete(`contacts/${id}`)
    .then(res => {
      dispatch(actions.deletingContactSuccess(id))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingContactFailure())
    })
}

export const emailContact = (params) => (dispatch) => {
  dispatch(actions.emailingContact())

  return Http.post(`contacts/${params.id}/email`, params)
    .then(res => dispatch(actions.emailingContactSuccess(res.data)))
    .catch(err => {
      console.log(err)
      dispatch(actions.emailingContactFailure())
    })
}

export const callContact = (params) => (dispatch) => {
  dispatch(actions.callingContact())

  return Http.post(`/contacts/${params.id}/call`, params)
    .then(res => dispatch(actions.callingContactSuccess(res.data)))
    .catch(err => {
      console.log(err)
      return dispatch(actions.callingContactFailure())
    })
}

/**
 *
 * @param input
 * @returns {Promise<any>}
 */
export const searchContacts = (input) => {
  const searchParams = JSON.stringify({
    offsets: [
      {
        keyword: "freetext",
        value: input,
        exact: false
      }
    ],
    text: input,
    exclude: {}
  })

  return Http.get('contacts', {params: {searchParams}})
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.log(err)
    })
}