import * as types from "../actions/types";

let Echo = window.Echo;

Echo.channel('opportunities')
  .listen('OpportunityUpdated', (e) => {
    let state = window.reduxStore.getState().opportunityState;
    let type = types.FETCHING_OPPORTUNITIES_SUCCESS;
    let entities = state.data;
    let index = _.findIndex(entities, {id: e.id});

    if (index >= 0) {
      entities[index] = e;
    }

    window.reduxStore.dispatch({
      type: types.FETCHING_OPPORTUNITIES
    });

    window.reduxStore.dispatch({
      type: type,
      data: entities,
      pagination: state.pagination
    });
  })
;