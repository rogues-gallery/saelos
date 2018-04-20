import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";
import { parseSearchString } from "../../utils/helpers";
import { getCustomFieldsForCompanies } from "./store/selectors";

/**
 * Fetch the full company by id
 *
 * @returns {function(*)}
 */
export const fetchCompany = id => dispatch => {
  dispatch(actions.fetchingCompany());
  dispatch(actions.fetchingCustomFieldsForCompanies());

  return Http.get(`companies/${id}`)
    .then(res => {
      dispatch(actions.fetchingCompanySuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingCompanyFailure());
    });
};

/**
 * Fetch a paginated list of companies
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchCompanies = params => dispatch => {
  const state = store.getState();
  const { isFetching } = state.companyState;

  if (isFetching) {
    return;
  }

  dispatch(
    actions.fetchingCompanies({
      ...params
    })
  );

  params = Object.assign({}, params || {});

  params.searchParams = parseSearchString(
    params.searchString,
    getCustomFieldsForCompanies(state)
  );

  delete params.searchString;

  return Http.get("companies", { params })
    .then(res => {
      dispatch(actions.fetchingCompaniesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingCompaniesFailure());
    });
};

export const fetchCompanyFields = () => dispatch => {
  dispatch(actions.fetchingCustomFieldsForCompanies());

  return Http.get(`contexts/Company`)
    .then(res => {
      dispatch(actions.fetchingCustomFieldsForCompaniesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingCustomFieldsForCompaniesFailure());
    });
};

/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export const searchCompanies = params => {
  const state = store.getState();
  params = Object.assign({}, params || {});

  params.searchParams = parseSearchString(
    params.searchString,
    getCustomFieldsForCompanies(state)
  );

  delete params.searchString;

  return Http.get("companies", { params: params })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const saveCompany = params => dispatch => {
  dispatch(actions.postingCompany());

  if (params.id) {
    return Http.patch(`companies/${params.id}`, params)
      .then(res => {
        dispatch(actions.postingCompanySuccess(res.data.data));
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingCompanyFailure());
      });
  } else {
    return Http.post(`companies`, params)
      .then(res => {
        dispatch(actions.postingCompanySuccess(res.data.data));
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        dispatch(actions.postingCompanyFailure());
      });
  }
};

export const deleteCompany = id => dispatch => {
  dispatch(actions.deletingCompany());

  return Http.delete(`companies/${id}`)
    .then(res => {
      dispatch(actions.deletingCompanySuccess(id));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingCompanyFailure());
    });
};

export const restoreCompany = id => {
  store.dispatch(actions.restoringCompany());
  const params = { action: "restore" };

  return Http.patch(`companies/${id}`, params)
    .then(res => {
      store.dispatch(actions.restoringCompanySuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      store.dispatch(actions.restoringCompanyFailure());
    });
};
