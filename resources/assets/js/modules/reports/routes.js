import Page from './page';

export default [
  {
    path: '/reports',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/reports/:id',
    exact: true,
    auth: true,
    component: Page
  }
];