import React from "react";
import { toast } from "react-toastify";
import { restoreCompany } from "../service";
import { _t } from "../../../i18n";

export const onCompanySave = payload =>
  toast(_t("messages.company.updated", { name: payload.name }));

export const onFetchingCompanies = () => {
  toast(_t("messages.loading"), { className: "toast list-toast" });
};

export const onFetchingCompaniesSuccess = () => {
  toast.dismiss();
};

export const onDeleteCompanySuccess = payload => {
  toast(
    <div>
      {_t("messages.company.deleted")}
      <span className="float-right" onClick={() => restoreCompany(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreCompanySuccess = payload =>
  toast(_t("messages.company.restored", { name: payload.name }));
