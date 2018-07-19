import React from "react";
import { toast } from "react-toastify";
import { restoreStatus } from "../service";
import { _t } from "../../../i18n";

export const onStatusSave = payload =>
  toast(_t("messages.generic.updated", { name: payload.name }));

export const onDeleteStatusSuccess = payload => {
  toast(
    <div>
      {_t("messages.generic.deleted", { name: _t("messages.stage") })}
      <span className="float-right" onClick={() => restoreStatus(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreStatusSuccess = payload =>
  toast(_t("messages.generic.restored", { name: payload.name }));
