import React from 'react'
import { toast } from "react-toastify"
import { restoreCompany } from '../service'

export const onCompanySave = (payload) =>
  toast(`${payload.name} has been updated.`)

export const onFetchingCompanies = () => {
  toast('Loading...', {className:"toast list-toast"})
}

export const onFetchingCompaniesSuccess = () => {
  toast.dismiss()
}

export const onDeleteCompanySuccess = (payload) => {
  toast(<div>
    Company deleted.
    <span className="float-right" onClick={() => restoreCompany(payload)}>
      <b>RESTORE</b>
    </span>
  </div>)
}

export const onRestoreCompanySuccess = (payload) =>
  toast(`${payload.name} restored.`)
