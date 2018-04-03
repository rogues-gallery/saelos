import React from 'react'
import { toast } from "react-toastify"
import { restoreField } from '../service'

export const onFieldSave = (payload) =>
  toast(`${payload.label} has been updated.`)

export const onFetchingFields = () => {
  toast('Loading...', {className:"toast list-toast"})
}

export const onFetchingFieldsSuccess = () => {
  toast.dismiss()
}

export const onDeleteFieldSuccess = (payload) => {
  toast(<div>
    Company deleted.
    <span className="float-right" onClick={() => restoreField(payload)}>
      <b>RESTORE</b>
    </span>
  </div>)
}

export const onRestoreFieldSuccess = (payload) =>
  toast(`${payload.label} restored.`)
