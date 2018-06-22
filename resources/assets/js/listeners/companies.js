import { NotificationManager } from "react-notifications";
import * as types from "../modules/companies/store/action-types";

let Echo = window.Echo;

Echo.channel("companies").listen("CompanyUpdated", e => {
  let state = window.reduxStore.getState().accountState;
  let type = types.FETCHING_COMPANIES_SUCCESS;
  let entities = state.data;
  let index = _.findIndex(entities, { id: e.id });

  if (index >= 0) {
    entities[index] = e;
    state.data = entities;
  }

  window.reduxStore.dispatch({
    type: types.FETCHING_COMPANIES,
    data: {}
  });

  window.reduxStore.dispatch({
    type: type,
    data: state,
    pagination: state.pagination
  });
});
