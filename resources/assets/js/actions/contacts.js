import * as types from './types';
import fetch from '../utils/fetch';

export function fetchContacts(page = 1) {
  return (dispatch) => {
    dispatch({
      type: types.FETCHING_CONTACTS
    });

    let URL = '/people?page=' + page;

    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: types.FETCHING_CONTACTS_SUCCESS,
          data: response['hydra:member'],
          dataFetched: true,
          pagination: response['hydra:view']
        });
      });
  }
}
