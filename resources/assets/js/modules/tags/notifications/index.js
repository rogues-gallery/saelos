import React from 'react'
import { toast } from "react-toastify"
import { restoreTag } from '../service'
import _ from 'lodash'

export const onTagSave = (payload, entityType) => {
  const objectType = _.replace(entityType, 'App\\', '')
  toast(`${objectType} has been updated.`)
}
export const onDeleteTagSuccess = (payload) => {
  toast(<div>
    Tag deleted.
    <span className="float-right" onClick={() => restoreTag(payload)}>
      <b>RESTORE</b>
    </span>
  </div>)
}

export const onRestoreTagSuccess = (payload) =>
  toast(`${payload.name} restored.`)
