import * as types from "./action-types";
import _ from "lodash";
import Role from "../Role";

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
  error: false
};

export default function roleReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ROLES:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCHING_ROLES_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
        isFetching: false,
        error: false
      };
    case types.FETCHING_SINGLE_ROLE_FAILURE:
    case types.FETCHING_ROLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case types.FETCHING_SINGLE_ROLE_SUCCESS:
      const index = _.findIndex(
        state.data,
        r => r.id === parseInt(action.data.id)
      );

      if (index >= 0) {
        state.data[index] = action.data;
      } else {
        state.data.push(action.data);
      }

      return {
        ...state,
        isFetching: false,
        error: false
      };
    default:
      return state;
  }
}

export const getRoles = state => state.data.map(r => new Role(r));
export const getRole = (state, id) => {
  let role = _.find(getRoles(state), r => r.id === parseInt(id));

  if (typeof role === "undefined") {
    return new Role({});
  }

  return role;
};

export const getRoleIndex = (state, id) =>
  _.findIndex(getRoles(state), r => r.id === parseInt(id));

export const getSearchStringForRoles = state => state.searchString;
export const getPaginationForRoles = state => state.meta;
