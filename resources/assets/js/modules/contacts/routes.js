import List from './pages/list';

export default [
  {
    path: '/contacts',
    exact: true,
    auth: true,
    component: List
  }
];