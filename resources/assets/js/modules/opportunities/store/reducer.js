import * as types from "./action-types";
import _ from "lodash";
import Opportunity from "../Opportunity";
import {
  DELETING_NOTE_SUCCESS,
  POSTING_NOTE_SUCCESS
} from "../../notes/store/action-types";

const initialState = {
  data: [],
  meta: {
    currentPage: 0,
    from: 0,
    lastPage: 0,
    path: "",
    perPage: 0,
    to: 0,
    total: 0
  },
  isFetching: false,
  isPosting: false,
  error: false,
  searchString: "",
  inEdit: false
};

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case types.EDITING_OPPORTUNITY:
      return {
        ...state,
        inEdit: true
      };
    case types.EDITING_OPPORTUNITY_FINISHED:
      return {
        ...state,
        inEdit: false
      };
    case types.FETCHING_OPPORTUNITIES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      };
    case types.FETCHING_OPPORTUNITIES_SUCCESS:
      let { data, meta } = action.data;
      let newOpportunitiesForState;

      // When fetching the first page, always replace the opps in the app state
      if (meta.current_page === 1) {
        newOpportunitiesForState = data;
      } else {
        newOpportunitiesForState = state.data;

        data.map(o => {
          newOpportunitiesForState = injectOpportunityIntoState(
            o,
            newOpportunitiesForState
          );
        });
      }

      return {
        ...state,
        data: newOpportunitiesForState,
        meta: meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_SINGLE_OPPORTUNITY_FAILURE:
    case types.FETCHING_OPPORTUNITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.POSTING_OPPORTUNITY:
      return {
        ...state,
        isPosting: true
      };
    case types.POSTING_OPPORTUNITY_SUCCESS:
      const newNewData = injectOpportunityIntoState(action.data, state.data);

      return {
        ...state,
        data: newNewData,
        isFetching: false,
        error: false,
        isPosting: false,
        inEdit: false
      };
    case types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS:
      const newData = injectOpportunityIntoState(action.data, state.data);

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      };
    case types.DELETING_OPPORTUNITY_SUCCESS:
      const updatedData = removeOpportunityFromState(action.data, state.data);

      return {
        ...state,
        data: updatedData
      };

    case types.RESTORING_OPPORTUNITY_SUCCESS:
      const updatedDate = injectOpportunitiesIntoState(action.data, state.data);

      return {
        ...state,
        date: updatedData
      };

    case DELETING_NOTE_SUCCESS:
    case POSTING_NOTE_SUCCESS:
      const { entity_type, entity_id } = action.data.data;

      if (entity_type !== "App\\Opportunity") {
        return state;
      }

      const opp = _.find(state.data, c => c.id === entity_id);

      if (!opp.id) {
        return state;
      }

      if (action.type === DELETING_NOTE_SUCCESS) {
        opp.notes = _.filter(opp.notes, n => n.id !== action.data.data.id);
      } else {
        const noteIndex = _.findIndex(
          opp.notes,
          n => n.id === action.data.data.id
        );

        if (noteIndex >= 0) {
          opp.notes[noteIndex] = action.data.data;
        } else {
          opp.notes.unshift(action.data.data);
        }
      }

      const updatedDataWithNotes = injectOpportunityIntoState(opp, state.data);

      return {
        ...state,
        data: updatedDataWithNotes
      };
    default:
      return state;
  }
}

const injectOpportunityIntoState = (opportunity, data) => {
  const index = _.findIndex(data, o => o.id === parseInt(opportunity.id));

  if (index >= 0) {
    data[index] = opportunity;
  } else {
    data.push(opportunity);
  }

  return data;
};

const removeOpportunityFromState = (id, data) => {
  _.remove(data, c => c.id === parseInt(id));

  return data;
};

export const getOpportunityIndex = (state, id) =>
  _.findIndex(getOpportunities(state), o => o.id === parseInt(id));
export const getOpportunity = (state, id) => {
  let opportunity = _.find(getOpportunities(state), o => o.id === parseInt(id));

  if (typeof opportunity === "undefined") {
    return new Opportunity({ custom_fields: [] });
  }

  return opportunity;
};
export const getOpportunities = state =>
  state.data.map(o => new Opportunity(o));
export const getPaginationForOpportunities = state => state.meta;
export const isStateDirty = state => state.isPosting;
export const getSearchStringForOpportunities = state => state.searchString;
export const getFirstOpportunityId = state =>
  state.data.length ? state.data[0].id : 0;
export const isInEdit = state => state.inEdit;
