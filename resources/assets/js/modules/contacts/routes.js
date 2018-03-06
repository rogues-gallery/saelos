import List from './pages/list';
import Record from './pages/record';

export default [
  {
    path: '/contacts',
    exact: true,
    auth: true,
    component: List
  },
  {
    path: '/contacts/:id',
    exact: true,
    auth: true,
    component: Record
  }
];