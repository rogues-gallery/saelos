import { toast } from "react-toastify";

export const onTagSave = (payload) =>
  toast(`${payload.name} has been updated.`)
