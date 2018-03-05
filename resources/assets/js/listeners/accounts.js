import { NotificationManager } from 'react-notifications';
import * as types from '../actions/types';

let Echo = window.Echo;

Echo.channel('companies')
  .listen('CompanyUpdated', (e) => {
    let state = window.reduxStore.getState().accountState;
    let type = types.FETCHING_ACCOUNTS_SUCCESS;
    let entities = state.data;
    let index = _.findIndex(entities, {id: e.id});

    if (index >= 0) {
      entities[index] = e;
    }

    window.reduxStore.dispatch({
      type: types.FETCHING_ACCOUNTS
    });

    window.reduxStore.dispatch({
      type: type,
      data: entities,
      pagination: state.pagination
    });
  })
;