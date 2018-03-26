import Page from './page';

export default [
  {
    path: '/config/statuses',
    exact: true,
    auth: true,
    config: true,
    component: Page
  },
  {
    path: '/config/statuses/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];