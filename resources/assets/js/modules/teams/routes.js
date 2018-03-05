import List from './pages/list';

export default [
  {
    path: '/teams',
    exact: true,
    auth: true,
    component: List
  }
];