import Page from './page';

export default [
  {
    path: '/opportunities',
    exact: true,
    auth: true,
    component: Page
  },
  {
    path: '/opportunities/:id',
    exact: true,
    auth: true,
    component: Page
  }
];