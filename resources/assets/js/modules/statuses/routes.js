import Page from './page';
import * as MDIcons from "react-icons/lib/md/index";

export default [
  {
    path: '/config/statuses',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdLabelOutline,
      location: 'config',
      linkText: 'Statuses',
      subLinks: false,
      roles: ['admin', 'manager']
    }
  },
  {
    path: '/config/statuses/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
]