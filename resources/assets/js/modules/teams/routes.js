import Page from './page';

export default [
  {
    path: '/config/teams',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/config/teams/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];