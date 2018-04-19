import * as fromReducer from "./reducer";

export const getAuth = state => fromReducer.getAuth(state.auth);
