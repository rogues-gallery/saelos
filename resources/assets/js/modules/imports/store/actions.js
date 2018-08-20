import * as types from "./action-types";
import * as notifications from "../notifications";

export const fetchingImport = () => ({
  type: types.FETCHING_SINGLE_IMPORT
});

export const fetchingImportSuccess = payload => ({
  type: types.FETCHING_SINGLE_IMPORT_SUCCESS,
  data: payload
});

export const fetchingImportFailure = () => ({
  type: types.FETCHING_SINGLE_IMPORT_FAILURE
});

export const fetchingImports = payload => ({
  type: types.FETCHING_IMPORTS,
  data: payload
});

export const fetchingImportsSuccess = payload => ({
  type: types.FETCHING_IMPORTS_SUCCESS,
  data: payload
});

export const fetchingImportsFailure = () => ({
  type: types.FETCHING_IMPORTS_FAILURE
});

export const postingImport = () => ({
  type: types.POSTING_IMPORT
});

export const postingImportSuccess = payload => {
  notifications.onImportSave(payload);

  return {
    type: types.POSTING_IMPORT_SUCCESS,
    data: payload
  };
};

export const postingImportFailure = errors => ({
  type: types.POSTING_IMPORT_FAILURE,
  data: errors
});

export const deletingImport = () => ({
  type: types.DELETING_IMPORT
});

export const deletingImportSuccess = payload => {
  notifications.onDeleteImportSuccess(payload);

  return {
    type: types.DELETING_IMPORT_SUCCESS,
    data: payload
  };
};

export const deletingImportFailure = () => ({
  type: types.DELETING_IMPORT_FAILURE
});

export const restoringImport = () => ({
  type: types.RESTORING_IMPORT
});

export const restoringImportSuccess = payload => {
  notifications.onRestoreImportSuccess(payload);

  return {
    type: types.RESTORING_IMPORT_SUCCESS,
    data: payload
  };
};
