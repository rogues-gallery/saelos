import * as types from './types';
import fetch from '../utils/fetch';

export function fetchContacts(page = 1) {
  return (dispatch) => {
    dispatch({
      type: types.FETCHING_CONTACTS
    });

    let URL = '/people?page=' + page;

    fetch(URL)
      .then((response) => {
        dispatch({
          type: types.FETCHING_CONTACTS_SUCCESS,
          data: response.data.data,
          dataFetched: true,
          pagination: response.data.meta
        });
      });
  }
}

export function postContact(data, dispatch) {
    dispatch({
        type: types.POSTING_CONTACT
    });

    let METHOD = 'POST';
    let URL = '/people';

    if (data.hasOwnProperty('id')) {
      URL = URL + '/' + data.id;
      METHOD = 'PATCH';
    }

    let options = {
      body: data,
      method: METHOD
    };

    fetch(URL, options)
        .then((response) => {
          dispatch({
              type: types.POSTING_CONTACT_SUCCESS,
              data: response.data.data,
              dataFetched: true
          })
        });
}
