import Page from "./page";
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: "/analytics",
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdInsertChart,
      location: "main",
      linkText: "messages.analytics",
      subLinks: false,
      roles: ["admin", "manager"]
    }
  }
];
