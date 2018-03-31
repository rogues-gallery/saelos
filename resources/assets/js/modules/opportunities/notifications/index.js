import { toast } from "react-toastify";

export const onOpportunitySave = (payload) =>
  toast(`${payload.name} has been updated.`)

export const onFetchingOpportunities = () => {
  toast('Loading...', {className:"toast list-toast"})
}

export const onFetchingOpportunitiesSuccess = () => {
  toast.dismiss()
}
