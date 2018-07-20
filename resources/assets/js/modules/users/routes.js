import Page from "./page";
import ProfilePage from "./page/profile";
import * as MDIcons from "react-icons/lib/md";

export default [
  {
    path: "/user/profile",
    exact: true,
    auth: true,
    component: ProfilePage
  },
  {
    path: "/config/users",
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPerson,
      location: "config",
      linkText: "messages.user_plural",
      subLinks: false,
      roles: ["admin", "manager"]
    }
  },
  {
    path: "/config/users/:id",
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];
