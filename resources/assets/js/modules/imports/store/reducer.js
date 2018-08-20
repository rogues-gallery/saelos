import * as types from "./action-types";
import Import from "../Import";

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
  searchString: ""
};

export default function importReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_IMPORTS:
      return {
        ...state,
        isFetching: true,
        searchString: action.data.searchString
      };
    case types.FETCHING_SINGLE_IMPORT:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCHING_IMPORTS_SUCCESS:
      let { data, meta } = action.data;
      let newImportsForState;

      if (data.length === 0) {
        return {
          ...state,
          isFetching: false
        };
      }

      // When fetching the first page, always replace the contacts in the app state
      if (meta.current_page === 1) {
        newImportsForState = data;
      } else {
        newImportsForState = state.data;

        data.map(c => {
          newImportsForState = injectImportIntoState(c, newImportsForState);
        });
      }

      return {
        ...state,
        data: newImportsForState,
        meta: meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_SINGLE_IMPORT_FAILURE:
    case types.FETCHING_IMPORTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.POSTING_IMPORT:
      return {
        ...state,
        isPosting: true
      };
    case types.POSTING_IMPORT_FAILURE:
      return {
        ...state,
        error: action.data
      };
    case types.POSTING_IMPORT_SUCCESS:
    case types.FETCHING_SINGLE_IMPORT_SUCCESS:
    case types.RESTORING_IMPORT_SUCCESS:
      const newData = injectImportIntoState(action.data, state.data);

      return {
        ...state,
        data: newData,
        isFetching: false,
        error: false,
        isPosting: false
      };

    case types.DELETING_IMPORT_SUCCESS:
      const updatedData = removeImportFromState(action.data, state.data);

      return {
        ...state,
        data: updatedData
      };

    default:
      return state;
  }
}

const removeImportFromState = (id, data) => {
  _.remove(data, f => f.id === parseInt(id));

  return data;
};

// @TODO Merge into state in correct order
const injectImportIntoState = (imp, data) => {
  const index = _.findIndex(data, c => c.id === parseInt(imp.id));

  if (index >= 0) {
    data[index] = imp;
  } else {
    data.push(imp);
  }

  return data;
};

export const getImports = state => state.data.map(s => new Import(s));
export const getImport = (state, id) => {
  let imp = _.find(getImports(state), s => s.id === parseInt(id));

  if (typeof imp === "undefined") {
    return new Import({});
  }

  return imp;
};
export const getSearchStringForImports = state => state.searchString;
export const getPaginationForImports = state => state.meta;
export const getImportError = state => state.error;
