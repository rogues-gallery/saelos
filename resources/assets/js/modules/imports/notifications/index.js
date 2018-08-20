import React from "react";
import { toast } from "react-toastify";
import { restoreImport } from "../service";
import { _t } from "../../../i18n";

export const onImportSave = payload =>
  toast(_t("messages.generic.updated", { name: payload.name }));

export const onFetchingImports = () => {
  toast(_t("messages.loading"), { className: "toast list-toast" });
};

export const onFetchingImportsSuccess = () => {
  toast.dismiss();
};

export const onDeleteImportSuccess = payload => {
  toast(
    <div>
      {_t("messages.generic.deleted", { name: _t("messages.import") })}
      <span className="float-right" onClick={() => restoreImport(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreImportSuccess = payload =>
  toast(_t("messages.generic.restored", { name: payload.name }));
