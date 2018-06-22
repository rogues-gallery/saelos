import { NotificationManager } from "react-notifications";
import * as types from "../modules/contacts/store/action-types";

let Echo = window.Echo;

Echo.channel("contacts")
  .listen("ContactUpdated", e => {
    let state = window.reduxStore.getState().contactState;
    let type = types.FETCHING_CONTACTS_SUCCESS;
    let entities = state.data;
    let index = _.findIndex(entities, { id: e.id });

    if (index >= 0) {
      entities[index] = e;
      state.data = entities;
    }

    window.reduxStore.dispatch({
      type: types.FETCHING_CONTACTS,
      data: {}
    });

    window.reduxStore.dispatch({
      type: type,
      data: state,
      pagination: state.pagination
    });
  })
  .listen("ContactEmailed", e => {});
