import React from 'react'
import { toast } from "react-toastify";
import { restoreStatus } from '../service'

export const onStatusSave = (payload) =>
  toast(`${payload.name} has been updated.`)

export const onDeleteStatusSuccess = (payload) => {
  toast(<div>
    Status deleted.
    <span className="float-right" onClick={() => restoreStatus(payload)}>
      <b>RESTORE</b>
    </span>
  </div>)
}

export const onRestoreStatusSuccess = (payload) =>
  toast(`${payload.name} restored.`)
