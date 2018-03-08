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
  customFields : []
}

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_OPPORTUNITIES:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
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
      const index = _.findIndex(state.data, (o) => o.id === parseInt(action.data.id));

      if (index >= 0) {
        state.data[index] = action.data
      } else {
        state.data.push(action.data);
      }

      return {
        ...state,
        isFetching: false,
        error: false
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