import Page from './page';

export default [
  {
    path: '/config/fields',
    exact: true,
    auth: true,
    config: true,
    component: Page
  },
  {
    path: '/config/fields/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];