import { toast } from "react-toastify";

export const onStageSave = (payload) =>
  toast(`${payload.name} has been updated.`)
