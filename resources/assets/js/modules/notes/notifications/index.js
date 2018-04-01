import { toast } from "react-toastify";

export const onNoteSave = (payload) =>
  toast(`Note added.`, {className:"toast detail-toast"})
