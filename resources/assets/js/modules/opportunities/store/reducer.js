import * as types from './action-types';
import _ from 'lodash';
import Opportunity from "../Opportunity";

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
  customFields : [],
  searchString: ''
}

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_OPPORTUNITIES:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      }
    case types.FETCHING_OPPORTUNITIES_SUCCESS:
      let { data, meta } = action.data
      let newOpportunitiesForState

      if (data.length === 0) {
        return state
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newOpportunitiesForState = data
      } else {
        newOpportunitiesForState = state.data

        data.map(o => {
          newOpportunitiesForState = injectOpportunityIntoState(o, newOpportunitiesForState)
        })
      }

      return {
        ...state,
        data: newOpportunitiesForState,
        meta: meta,
        isFetching: false,
        error: false
      }
    case types.FETCHING_SINGLE_OPPORTUNITY_FAILURE:
    case types.FETCHING_OPPORTUNITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case types.POSTING_OPPORTUNITY:
      return {
        ...state,
        isPosting: true
      }
    case types.POSTING_OPPORTUNITY_SUCCESS:
    case types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS:
      const newData = injectOpportunityIntoState(action.data, state.data)

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      }
    case types.FETCHING_CUSTOM_FIELDS_FOR_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        customFields: action.data
      }
    default:
      return state
  }
}

const injectOpportunityIntoState = (opportunity, data) => {
  const index = _.findIndex(data, (o) => o.id === parseInt(opportunity.id))

  if (index >= 0) {
    data[index] = _.merge(data[index], opportunity)
  } else {
    data.push(opportunity)
  }

  return data
}

export const getOpportunityIndex = (state, id) => _.findIndex(getOpportunities(state), (o) => o.id === parseInt(id));
export const getOpportunity = (state, id) => {
  let opportunity = _.find(getOpportunities(state), (o) => o.id === parseInt(id));

  if (typeof opportunity === 'undefined') {
    return new Opportunity({})
  }

  return new Opportunity(opportunity);
}
export const getOpportunities = (state) => state.data;
export const getPaginationForOpportunities = (state) => state.meta;
export const getCustomFieldsForOpportunities = (state) => state.customFields;
export const isStateDirty = (state) => state.isPosting;
export const getSearchStringForOpportunities = (state) => state.searchString;
export const getFirstOpportunityId = (state) => state.data.length ? state.data[0].id : 0