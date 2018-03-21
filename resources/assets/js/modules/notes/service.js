import Http from '../../utils/Http'
import * as actions from './store/actions'

export const saveNote = (params) => (dispatch) => {
  dispatch(actions.postingNote());

  let url;
  let prefix;
  let method = 'post'

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

  url = `${prefix}/${params.entity_id}/notes`

  if (params.id) {
    url = `${url}/${params.id}`
    method = 'patch'
  }

  return Http[method](url, {
    ...params
  })
    .then(res => {
      dispatch(actions.postingNoteSuccess({data: res.data}))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.postingNoteFailure())
    })
}

export const deleteNote = (params) => {
  console.log(params)
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
  };

  return Http.post(link, formData, config);
}