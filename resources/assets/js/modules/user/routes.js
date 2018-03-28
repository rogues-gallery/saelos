import Page from './page';

export default [
  {
    path: '/user/profile',
    exact: true,
    auth: true,
    component: Page
  }
];