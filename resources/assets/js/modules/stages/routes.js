import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/config/stages',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdFlag,
      location: 'config',
      linkText: 'Stages',
      subLinks: false,
      roles: ['admin', 'manager']
    }
  },
  {
    path: '/config/stages/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];