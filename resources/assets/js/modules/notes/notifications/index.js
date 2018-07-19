import { toast } from "react-toastify";
import { _t } from "../../../i18n";

export const onNoteSave = payload =>
  toast(_t("messages.generic.added", { name: _t("messages.note") }), {
    className: "toast detail-toast"
  });
