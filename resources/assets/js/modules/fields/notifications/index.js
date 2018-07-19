import React from "react";
import { toast } from "react-toastify";
import { restoreField } from "../service";
import { _t } from "../../../i18n";

export const onFieldSave = payload =>
  toast(_t("messages.generic.updated", { name: payload.label }));

export const onFetchingFields = () => {
  toast(_t("messages.loading"), { className: "toast list-toast" });
};

export const onFetchingFieldsSuccess = () => {
  toast.dismiss();
};

export const onDeleteFieldSuccess = payload => {
  toast(
    <div>
      {_t("messages.generic.deleted", { name: _t("messages.company") })}
      <span className="float-right" onClick={() => restoreField(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreFieldSuccess = payload =>
  toast(_t("messages.generic.restored", { name: payload.label }));
