import Page from './page';

export default [
  {
    path: '/companies',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/companies/:id',
    exact: true,
    auth: true,
    component: Page
  }
];