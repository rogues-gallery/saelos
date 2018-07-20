import Page from "./page";
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: "/config/fields",
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdFeaturedPlayList,
      location: "config",
      linkText: "messages.field_plural",
      subLinks: false,
      roles: ["admin", "manager"]
    }
  },
  {
    path: "/config/fields/:id",
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];
