import * as types from './action-types'
import * as notifications from '../notifications'

export const fetchingStatus = () => ({
  type: types.FETCHING_SINGLE_STATUS
})

export const fetchingStatusSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_STATUS_SUCCESS,
  data: payload
})

export const fetchingStatusFailure = () => ({
  type: types.FETCHING_SINGLE_STATUS_FAILURE
})

export const fetchingStatuses = (payload) => ({
  type: types.FETCHING_STATUSES,
  data: payload
})

export const fetchingStatusesSuccess = (payload) => ({
  type: types.FETCHING_STATUSES_SUCCESS,
  data: payload
})

export const fetchingStatusesFailure = () => ({
  type: types.FETCHING_STATUSES_FAILURE
})

export const postingStatus = () => ({
  type: types.POSTING_STATUS
})

export const postingStatusSuccess = (payload) => {
  notifications.onStatusSave(payload)

  return {
    type: types.POSTING_STATUS_SUCCESS,
    data: payload
  }
}

export const restoringStatus = () => ({
  type: types.RESTORING_STATUS
})

export const restoringStatusSuccess = (payload) => {
  notifications.onRestoreStatusSuccess(payload)

  return {
    type: types.RESTORING_STATUS_SUCCESS,
    data: payload
  }
}

export const postingStatusFailure = () => ({
  type: types.POSTING_STATUS_FAILURE
})

export const deletingStatus = () => ({
  type: types.DELETING_STATUS
})

export const deletingStatusSuccess = (payload) => {
  notifications.onDeleteStatusSuccess(payload)

  return {
    type: types.DELETING_STATUS_SUCCESS,
    data: payload
  }
}

export const deletingStatusFailure = () => ({
  type: types.DELETING_STATUS_FAILURE
})
