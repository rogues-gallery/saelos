import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/headquarters',
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdNetworkCheck,
      location: 'main',
      linkText: 'My Vector',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/headquarters/:id',
    exact: true,
    auth: true,
    component: Page
  }
];