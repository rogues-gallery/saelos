import * as types from './action-types';
import * as notifications from "../notifications";

export const fetchingTag = () => ({
  type: types.FETCHING_SINGLE_TAG
})

export const fetchingTagSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_TAG_SUCCESS,
  data: payload
})

export const fetchingTagFailure = () => ({
  type: types.FETCHING_SINGLE_TAG_FAILURE
})

export const fetchingTags = (payload) => ({
  type: types.FETCHING_TAGS,
  data: payload
})

export const fetchingTagsSuccess = (payload) => ({
  type: types.FETCHING_TAGS_SUCCESS,
  data: payload
})

export const fetchingTagsFailure = () => ({
  type: types.FETCHING_TAGS_FAILURE
})

export const postingTag = () => ({
  type: types.POSTING_TAG
})

export const postingTagSuccess = (payload) => {
  notifications.onTagSave(payload)

  return {
    type: types.POSTING_TAG_SUCCESS,
    data: payload
  }
}

export const restoringTag = () => ({
  type: types.RESTORING_TAG
})

export const restoringTagSuccess = (payload) => {
  notifications.onRestoreTagSuccess(payload)

  return {
    type: types.RESTORING_TAG_SUCCESS,
    data: payload
  }
}

export const postingTagFailure = () => ({
  type: types.POSTING_TAG_FAILURE
})

export const deletingTag = () => ({
  type: types.DELETING_TAG
})

export const deletingTagSuccess = (payload) => {
  notifications.onDeleteTagSuccess(payload)

  return {
    type: types.DELETING_TAG_SUCCESS,
    data: payload
  }
}

export const deletingTagFailure = () => ({
  type: types.DELETING_TAG_FAILURE
})
