import Page from './page';

export default [
  {
    path: '/accounts',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/accounts/:id',
    exact: true,
    auth: true,
    component: Page
  }
];