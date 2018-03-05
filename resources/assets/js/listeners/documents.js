import * as types from '../actions/types';

let Echo = window.Echo;
let _ = require('lodash');

Echo.channel('documents')
  .listen('DocumentAdded', (e) => {
    window.reduxStore.dispatch({
      type: types.APPEND_DOCUMENT_TO_FLYOUT,
      data: e,
      entityId: e.entity_id,
      entityType: e.entity_type
    });

    let state = null;
    let type = null;

    switch (e.entity_type) {
      case 'App\\Deal':
        state = window.reduxStore.getState().opportunityState;
        type = types.FETCHING_OPPORTUNITIES_SUCCESS;
        break;
      case 'App\\Company':
        state = window.reduxStore.getState().accountState;
        type = types.FETCHING_ACCOUNTS_SUCCESS;
        break;
      case 'App\\Person':
        state = window.reduxStore.getState().contactState;
        type = types.FETCHING_CONTACTS_SUCCESS;
        break;
    }

    let entities = state.data;
    let index = _.findIndex(entities, {id: e.entity_id});

    if (index >= 0) {
      entities[index].documents.unshift(e);
    }

    window.reduxStore.dispatch({
      type: type,
      data: entities,
      pagination: state.pagination
    });
  })
;