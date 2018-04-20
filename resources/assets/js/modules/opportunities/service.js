import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";
import { parseSearchString } from "../../utils/helpers";
import { getCustomFieldsForOpportunities } from "./store/selectors";

/**
 * Fetch the full contact by id
 *
 * @returns {function(*)}
 */
export const fetchOpportunity = id => dispatch => {
  dispatch(actions.fetchingOpportunity());

  return Http.get(`opportunities/${id}`)
    .then(res => {
      dispatch(actions.fetchingOpportunitySuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingOpportunityFailure());
    });
};

/**
 * Fetch a paginated list of contacts
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchOpportunities = params => dispatch => {
  const state = store.getState();
  const { isFetching } = state.opportunityState;

  if (isFetching) {
    return;
  }

  dispatch(
    actions.fetchingOpportunities({
      ...params
    })
  );

  params = Object.assign({}, params || {});

  params.searchParams = parseSearchString(
    params.searchString,
    getCustomFieldsForOpportunities(state)
  );

  delete params.searchString;

  return Http.get("opportunities", { params })
    .then(res => {
      dispatch(actions.fetchingOpportunitiesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingOpportunitiesFailure());
    });
};

export const fetchOpportunityFields = () => dispatch => {
  dispatch(actions.fetchingCustomFieldsForOpportunities());

  return Http.get(`contexts/Opportunity`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForOpportunitiesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingCustomFieldsForOpportunitiesFailure());
    });
};

export const saveOpportunity = params => dispatch => {
  dispatch(actions.postingOpportunity());

  if (params.id) {
    return Http.patch(`opportunities/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingOpportunitySuccess(res.data.data));
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingOpportunityFailure());
      });
  } else {
    return Http.post(`opportunities`, params)
      .then(res => {
        dispatch(actions.postingOpportunitySuccess(res.data.data));
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingOpportunityFailure());
      });
  }
};

export const deleteOpportunity = id => dispatch => {
  dispatch(actions.deletingOpportunity());

  return Http.delete(`opportunities/${id}`)
    .then(res => {
      dispatch(actions.deletingOpportunitySuccess(id));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingOpportunityFailure());
    });
};

/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export const searchOpportunities = params => {
  const state = store.getState();
  params = Object.assign({}, params || {});

  params.searchParams = parseSearchString(
    params.searchString,
    getCustomFieldsForOpportunities(state)
  );

  return Http.get("opportunities", { params: params })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const restoreOpportunity = id => dispatch => {
  dispatch(actions.restoringOpportunity());

  return Http.patch(`opportunities/${id}`)
    .then(res => {
      dispatch(actions.restoringOpportunitySuccess(id));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.restoringOpportunityFailure());
    });
};
