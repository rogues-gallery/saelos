import * as types from "./action-types";
import * as notifications from "../notifications";

export const postingNote = () => ({
  type: types.POSTING_NOTE
});

export const postingNoteSuccess = payload => {
  notifications.onNoteSave(payload);

  return {
    type: types.POSTING_NOTE_SUCCESS,
    data: payload
  };
};

export const postingNoteFailure = () => ({
  type: types.POSTING_NOTE_FAILURE
});

export const deletingNote = () => ({
  type: types.DELETING_NOTE
});

export const deletingNoteSuccess = payload => ({
  type: types.DELETING_NOTE_SUCCESS,
  data: payload
});

export const deletingNoteFailure = () => ({
  type: types.DELETING_NOTE_FAILURE
});
