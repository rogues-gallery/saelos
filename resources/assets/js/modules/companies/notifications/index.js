import { toast } from "react-toastify";

export const onCompanySave = (payload) =>
  toast(`${payload.name} has been updated.`)

export const onFetchingCompanies = () => {
  toast('Loading...', {className:"toast list-toast"})
}

export const onFetchingCompaniesSuccess = () => {
  toast.dismiss()
}
