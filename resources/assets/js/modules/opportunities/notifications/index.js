import React from "react";
import { toast } from "react-toastify";
import { restoreOpportunity } from "../service";

export const onOpportunitySave = payload =>
  toast(`${payload.name} has been updated.`);

export const onFetchingOpportunities = () => {
  toast("Loading...", { className: "toast list-toast" });
};

export const onFetchingOpportunitiesSuccess = () => {
  toast.dismiss();
};
export const onDeleteOpportunitySuccess = payload => dispatch => {
  toast(
    <div>
      Opportunity deleted.
      <span className="float-right" onClick={restoreOpportunity(payload.id)}>
        RESTORE
      </span>
    </div>
  );
};
