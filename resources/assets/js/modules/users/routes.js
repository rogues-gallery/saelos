import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/config/users',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPerson,
      location: 'config',
      linkText: 'Users',
      subLinks: false,
      roles: ['admin', 'manager']
    }
  },
  {
    path: '/config/users/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];