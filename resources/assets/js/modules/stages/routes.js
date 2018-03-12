import Page from './page';

export default [
  {
    path: '/config/stages',
    exact: true,
    auth: true,
    config: true,
    component: Page
  },
  {
    path: '/config/stages/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];