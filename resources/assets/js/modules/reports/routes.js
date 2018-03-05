import List from './pages/list';

export default [
  {
    path: '/reports',
    exact: true,
    auth: true,
    component: List
  }
];