import React from "react";
import { toast } from "react-toastify";
import { restoreStage } from "../service";
import { _t } from "../../../i18n";

export const onStageSave = payload =>
  toast(_t("messages.generic.updated", { name: payload.name }));

export const onDeleteStageSuccess = payload => {
  toast(
    <div>
      {_t("message.generic.deleted", { name: _t("messages.stage") })}
      <span className="float-right" onClick={() => restoreStage(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreStageSuccess = payload =>
  toast(_t("messages.generic.restored", { name: payload.name }));
