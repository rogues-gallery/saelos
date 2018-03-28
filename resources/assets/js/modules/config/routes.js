import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/config',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/config/settings',
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPeople,
      location: 'config',
      linkText: 'Settings',
      subLinks: false,
      roles: ['admin', 'manager']
    }
  }
];