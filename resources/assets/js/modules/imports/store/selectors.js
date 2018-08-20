import * as fromReducer from "./reducer";

export const getImports = state => fromReducer.getImports(state.importState);

export const getImport = (state, id) =>
  fromReducer.getImport(state.importState, id);

export const getSearchStringForImports = state =>
  fromReducer.getSearchStringForImports(state.importState);

export const getPaginationForImports = state =>
  fromReducer.getPaginationForImports(state.importState);

export const getImportError = state =>
  fromReducer.getImportError(state.importState);
