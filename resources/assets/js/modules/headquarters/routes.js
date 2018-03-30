import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/headquarters',
    exact: true,
    auth: true,
    component: Page,
    menu: {
      icon: MDIcons.MdPhonelink,
      location: 'main',
      linkText: 'Headquarters',
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