import * as types from "../modules/opportunities/store/action-types";

let Echo = window.Echo;

Echo.channel("deals").listen("DealUpdated", e => {
  let state = window.reduxStore.getState().opportunityState;
  let type = types.FETCHING_OPPORTUNITIES_SUCCESS;
  let entities = state.data;
  let index = _.findIndex(entities, { id: e.id });

  if (index >= 0) {
    entities[index] = e;
    state.data = entities;
  }

  window.reduxStore.dispatch({
    type: types.FETCHING_OPPORTUNITIES,
    data: {}
  });

  window.reduxStore.dispatch({
    type: type,
    data: state,
    pagination: state.pagination
  });
});
