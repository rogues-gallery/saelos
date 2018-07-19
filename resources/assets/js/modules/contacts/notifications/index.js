import { toast } from "react-toastify";
import { _t } from "../../../i18n";

export const onContactSave = payload =>
  toast(
    _t("messages.contact.updated", {
      first_name: payload.first_name,
      last_name: payload.last_name
    })
  );

export const onFetchingContacts = () => {
  toast(_t("messages.loading"), { className: "toast list-toast" });
};

export const onFetchingContactsSuccess = () => {
  toast.dismiss();
};
