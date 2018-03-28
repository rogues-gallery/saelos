import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/config/fields',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPeople,
      location: 'config',
      linkText: 'Fields',
      subLinks: false,
      roles: ['admin', 'manager']
    }
  },
  {
    path: '/config/fields/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];