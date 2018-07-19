import React from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { restoreTag } from "../service";
import { _t } from "../../../i18n";

export const onTagSave = (payload, entityType) => {
  const objectType = _.replace(entityType, "App\\", "");
  toast(__t("messages.generic.updated", { name: objectType }));
};

export const onDeleteTagSuccess = payload => {
  toast(
    <div>
      {_t("messages.generic.deleted", { name: _t("messages.tag") })}
      <span className="float-right" onClick={() => restoreTag(payload)}>
        <b>{_t("messages.restore").toUpperCase()}</b>
      </span>
    </div>
  );
};

export const onRestoreTagSuccess = payload =>
  toast(_t("messages.generic.restored", { name: payload.name }));
