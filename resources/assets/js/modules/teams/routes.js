import Page from "./page";
import * as MDIcons from "react-icons/lib/md";

export default [
  {
    path: "/config/teams",
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPeopleOutline,
      location: "config",
      linkText: "messages.team_plural",
      subLinks: false,
      roles: ["admin", "manager"]
    }
  },
  {
    path: "/config/teams/:id",
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: false
  }
];
