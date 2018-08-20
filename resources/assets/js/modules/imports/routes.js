import Page from "./page";
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: "/config/imports",
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdFeaturedPlayList,
      location: "config",
      linkText: "messages.import_plural",
      subLinks: false,
      roles: ["admin", "manager"]
    }
  }
];
