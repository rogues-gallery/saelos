import List from './pages/list';

export default [
  {
    path: '/workflows',
    exact: true,
    auth: true,
    component: List
  }
];