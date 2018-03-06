import Page from './page';

export default [
  {
    path: '/contacts',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/contacts/:id',
    exact: true,
    auth: true,
    component: Page
  }
];