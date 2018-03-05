import List from './pages/list';

export default [
  {
    path: '/opportunities',
    exact: true,
    auth: true,
    component: List
  }
];