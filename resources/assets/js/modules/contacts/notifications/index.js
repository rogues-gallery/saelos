import { toast } from "react-toastify";

export const onContactSave = (payload) =>
  toast(`${payload.first_name} ${payload.last_name} has been updated.`)

export const onFetchingContacts = () => {
  toast('Loading...', {className:"toast list-toast"})
}

export const onFetchingContactsSuccess = () => {
  toast.dismiss()
}
