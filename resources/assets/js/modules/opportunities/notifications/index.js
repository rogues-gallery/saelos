import React from "react";
import { toast } from "react-toastify";
import { restoreOpportunity } from "../service";
import { _t } from "../../../i18n";

export const onOpportunitySave = payload =>
  toast(_t("messages.generic.updated", { name: payload.name }));

export const onFetchingOpportunities = () => {
  toast(_t("messages.loading"), { className: "toast list-toast" });
};

export const onFetchingOpportunitiesSuccess = () => {
  toast.dismiss();
};
export const onDeleteOpportunitySuccess = payload => dispatch => {
  toast(
    <div>
      {_t("messages.generic.deleted", { name: _t("messages.opportunity") })}
      <span className="float-right" onClick={restoreOpportunity(payload.id)}>
        {_t("messages.restore").toUpperCase()}
      </span>
    </div>
  );
};
