import Http from '../../utils/Http'
import * as actions from './store/actions'

export const saveStage = (params) => (dispatch) => {
  dispatch(actions.savingStage());
}

export const deleteStage = (params) => {
  console.log(params)
}