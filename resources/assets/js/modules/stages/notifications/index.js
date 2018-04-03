import React from 'react'
import { toast } from "react-toastify";
import { restoreStage } from '../service'

export const onStageSave = (payload) =>
  toast(`${payload.name} has been updated.`)

export const onDeleteStageSuccess = (payload) => {
  toast(<div>
    Stage deleted.
    <span className="float-right" onClick={() => restoreStage(payload)}>
      <b>RESTORE</b>
    </span>
  </div>)
}

export const onRestoreStageSuccess = (payload) =>
  toast(`${payload.name} restored.`)
