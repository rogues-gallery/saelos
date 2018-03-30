import Page from './page'
import * as MDIcons from "react-icons/lib/md/index"

export default [
  {
    path: '/tags',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdLocalOffer,
      location: 'main',
      linkText: 'Tags',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/tags/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];