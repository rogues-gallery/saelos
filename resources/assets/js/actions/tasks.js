import * as types from './types';
import fetch from '../utils/fetch';

export function fetchTasks() {
  return (dispatch) => {
    dispatch({
      type: types.FETCHING_TASKS
    });

    let URL = '/tasks';

    fetch(URL)
      .then((response) => {
        dispatch({
          type: types.FETCHING_TASKS_SUCCESS,
          data: response.data,
          dataFetched: true,
          pagination: response.pagination
        });
      });
  }
}
