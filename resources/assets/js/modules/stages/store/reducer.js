import * as types from '../actions/types';

const initialState = {
  data: [],
  pagination: {},
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function stageReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_STAGES:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_STAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        data: action.data
      }
    case types.FETCHING_STAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
