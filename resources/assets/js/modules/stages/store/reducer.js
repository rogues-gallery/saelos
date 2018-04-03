import * as types from './action-types';
import Stage from "../Stage";

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: '',
    perPage: 0,
    to: 0,
    total: 0,
  },
  isFetching: false,
  isPosting: false,
  error: false,
  searchString: ''
}

export default function stageReducer(state = initialState, action) {
  switch (action.type) {
    case types.EDITING_STAGE:
      return {
        ...state,
        inEdit: !state.inEdit
      }
    case types.EDITING_STAGE_FINISHED:
      return {
        ...state,
        inEdit: false
      }
    case types.FETCHING_STAGES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_SINGLE_STAGE:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_STAGES_SUCCESS:
      let { data, meta } = action.data
      let newStagesForState

      if (data.length === 0) {
        return {
          ...state,
          isFetching: false
        }
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newStagesForState = data
      } else {
        newStagesForState = state.data

        data.map(c => {
          newStagesForState = injectStageIntoState(c, newStagesForState)
        })
      }

      return {
        ...state,
        data: newStagesForState,
        meta: meta,
        isFetching: false,
        error: false
      }

      case types.DELETING_STAGE_SUCCESS:
        const updatedData = removeStageFromState(action.data, state.data)

        return {
          ...state,
          data: updatedData
        }

    case types.FETCHING_SINGLE_STAGE_FAILURE:
    case types.FETCHING_STAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_STAGE:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_STAGE_SUCCESS:
    case types.FETCHING_SINGLE_STAGE_SUCCESS:
    case types.RESTORING_STAGE_SUCCESS:
      const newData = injectStageIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      }
    default:
      return state
  }
}

const removeStageFromState = (id, data) => {
  _.remove(data, (s) => s.id === parseInt(id))

  return data
}

const injectStageIntoState = (stage, data) => {
  const index = _.findIndex(data, (s) => s.id === parseInt(stage.id))

  if (index >= 0) {
    data[index] = stage
  } else {
    data.push(stage)
  }

  return data
}

export const getStages = (state) => state.data.map(s => new Stage(s))
export const getStage = (state, id) => {
  let stage = _.find(getStages(state), (s) => s.id === parseInt(id));

  if (typeof stage === 'undefined') {
    return Stage.create()
  }

  return stage;
}
export const getSearchStringForStages = (state) => state.searchString;
export const getPaginationForStages = (state) => state.meta;
