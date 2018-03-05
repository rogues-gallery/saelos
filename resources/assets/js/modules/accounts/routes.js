import List from './pages/list';

export default [
  {
    path: '/accounts',
    exact: true,
    auth: true,
    component: List
  }
];