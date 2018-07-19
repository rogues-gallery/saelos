import { NotificationManager } from "react-notifications";
import { _t } from "../i18n";

let Echo = window.Echo;

Echo.channel("saelos").listen("AppRefresh", e => {
  if (e.shouldReload) {
    NotificationManager.warning(
      _t("messages.update.message"),
      _t("messages.update.available"),
      10000,
      () => {
        location.reload();
      },
      true
    );
  }
});
