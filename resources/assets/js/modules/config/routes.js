import Page from './page';

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
    component: Page
  }
];