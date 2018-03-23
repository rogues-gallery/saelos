import * as types from './action-types';

export const fetchingField = () => ({
  type: types.FETCHING_SINGLE_FIELD
})

export const fetchingFieldSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_FIELD_SUCCESS,
  data: payload
})

export const fetchingFieldFailure = () => ({
  type: types.FETCHING_SINGLE_FIELD_FAILURE
})

export const fetchingFields = (payload) => ({
  type: types.FETCHING_FIELDS,
  data: payload
})

export const fetchingFieldsSuccess = (payload) => ({
  type: types.FETCHING_FIELDS_SUCCESS,
  data: payload
})

export const fetchingFieldsFailure = () => ({
  type: types.FETCHING_FIELDS_FAILURE
})

export const postingField = () => ({
  type: types.POSTING_FIELD
})

export const postingFieldSuccess = (payload) => ({
  type: types.POSTING_FIELD_SUCCESS,
  data: payload
})

export const postingFieldFailure = () => ({
  type: types.POSTING_FIELD_FAILURE
})

export const deletingField = () => ({
  type: types.DELETING_FIELD
})

export const deletingFieldSuccess = (payload) => ({
  type: types.DELETING_FIELD_SUCCESS,
  data: payload
})

export const deletingFieldFailure = () => ({
  type: types.DELETING_FIELD_FAILURE
})