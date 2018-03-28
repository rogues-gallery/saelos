import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/reports',
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdInsertChart,
      location: 'main',
      linkText: 'Reports',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/reports/:id',
    exact: true,
    auth: true,
    component: Page
  }
];