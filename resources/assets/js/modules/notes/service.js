import Http from '../../utils/Http'
import * as actions from './store/actions'
import Contact from '../contacts/Contact'
import Opportunity from '../opportunities/Opportunity'
import Company from '../companies/Company'

export const saveNote = (params) => (dispatch) => {
  dispatch(actions.postingNote());
  console.log(params)

  let url
  let prefix
  let method = 'post'
  let config = {}

  if (params.model instanceof Contact) {
    prefix = '/contacts'
  }

  if (params.model instanceof Company) {
    prefix = '/companies'
  }

  if (params.model instanceof Opportunity) {
    prefix = '/opportunities'
  }

  url = `${prefix}/${params.model.id}/notes`

  if (params.id) {
    url = `${url}/${params.id}`
    method = 'patch'
  }

  const formData = new FormData

  _.forOwn(params, (v, k) => {
    if (k !== 'user' && k !== 'model') {
      formData.append(k, v)
    }
  })

  config.headers = {
    'content-type': 'multipart/form-data'
  }

  return Http[method](url, formData, config)
    .then(res => {
      dispatch(actions.postingNoteSuccess({data: res.data}))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.postingNoteFailure())
    })
}

export const deleteNote = (params) => (dispatch) => {
  dispatch(actions.deletingNote());

  let url
  let prefix

  switch (params.entity_type) {
    case 'App\\Contact':
      prefix = `/contacts`
      break;
    case 'App\\Company':
      prefix = `/companies`
      break;
    case 'App\\Opportunity':
      prefix = `/opportunities`
      break;
    default:
      break;
  }

  url = `${prefix}/${params.entity_id}/notes/${params.id}`

  return Http.delete(url)
    .then(res => {
      dispatch(actions.deletingNoteSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.deletingNoteFailure())
    })
}

export const uploadFile = (url, file, name) => {
  console.log(url, file, name)
  return

  let link = (url.includes(API_PATH))
    ? API_HOST + url
    : API_HOST + API_PATH + url;

  let formData = new FormData();

  formData.append(name, file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return Http.post(link, formData, config);
}