import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";
import objectToFormData from "object-to-formdata";

/**
 * Fetch the full Import by id
 *
 * @returns {function(*)}
 */
export const fetchImport = id => dispatch => {
  dispatch(actions.fetchingImport());

  return Http.get(`imports/${id}`)
    .then(res => {
      dispatch(actions.fetchingImportSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingImportFailure());
    });
};

/**
 * Fetch a paginated list of Imports
 *
 * @param params
 * @returns {function(*)}
 */
export const fetchImports = params => dispatch => {
  const { isFetching } = store.getState().importState;

  if (isFetching) {
    return;
  }

  dispatch(
    actions.fetchingImports({
      ...params
    })
  );

  params = params || {};

  return Http.get("imports", { params: params })
    .then(res => {
      dispatch(actions.fetchingImportsSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.fetchingImportsFailure());
    });
};

export const saveImport = params => dispatch => {
  dispatch(actions.postingImport());

  let url = "/imports";
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  const formData = objectToFormData(params);

  if (params.id) {
    url = `${url}/${params.id}`;
    formData.append("_method", "PATCH");
  }

  return Http.post(url, formData, config)
    .then(res => {
      dispatch(actions.postingImportSuccess({ data: res.data }));
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.postingImportFailure(err.response.data.errors));
    });
};

export const deleteImport = id => dispatch => {
  dispatch(actions.deletingImport());

  return Http.delete(`imports/${id}`)
    .then(res => {
      dispatch(actions.deletingImportSuccess(id));
    })
    .catch(err => {
      console.log(err);
      dispatch(actions.deletingImportFailure());
    });
};

export const restoreImport = id => {
  store.dispatch(actions.restoringImport());
  const params = { action: "restore" };

  return Http.patch(`imports/${id}`, params)
    .then(res => {
      store.dispatch(actions.restoringImportSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err);
      store.dispatch(actions.restoringImportFailure());
    });
};
