import * as types from './action-types';

export const postingNote = () => ({
  type: types.POSTING_NOTE
})

export const postingNoteSuccess = (payload) => ({
  type: types.POSTING_NOTE_SUCCESS,
  data: payload
})

export const postingNoteFailure = () => ({
  type: types.POSTING_NOTE_FAILURE
})