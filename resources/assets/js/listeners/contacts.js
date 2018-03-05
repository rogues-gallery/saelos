import { NotificationManager } from 'react-notifications';
import * as types from "../actions/types";

let Echo = window.Echo;

Echo.channel('contacts')
  .listen('ContactUpdated', (e) => {
    let state = window.reduxStore.getState().contactState;
    let type = types.FETCHING_CONTACTS_SUCCESS;
    let entities = state.data;
    let index = _.findIndex(entities, {id: e.id});

    if (index >= 0) {
      entities[index] = e;
    }

    window.reduxStore.dispatch({
      type: types.FETCHING_CONTACTS
    });

    window.reduxStore.dispatch({
      type: type,
      data: entities,
      pagination: state.pagination
    });
  })
  .listen('ContactEmailed', (e) => {
  })
;