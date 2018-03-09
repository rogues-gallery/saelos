import Http from '../../utils/Http'
import * as actions from './store/actions'

export const saveNote = (params) => (dispatch) => {
  dispatch(actions.postingNote());

  let url;
  let prefix;
  let method = 'post'

  switch (params.entity_type) {
    case 'App\\Person':
      prefix = `/people`
      break;
    case 'App\\Company':
      prefix = `/companies`
      break;
    case 'App\\Deal':
      prefix = `/deals`
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