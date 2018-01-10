import Contacts from './components/Pages/Contacts';
import Dashboard from './components/Pages/Dashboard';
import Headquarters from './components/Pages/Headquarters';
import Manager from './components/Pages/Manager';
import Icons from './components/Pages/Icons';
import Forms from './components/Pages/Forms';
import RequireAuth from './components/Auth/RequireAuth';
import Accounts from "./components/Pages/Accounts";
import Opportunities from "./components/Pages/Opportunities";
import Reports from './components/Pages/Reports';
import Report from './components/Reports/Report';

export const routes = [
    {
        path: '/',
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
        breadcrumb_link: true,
        exact: true,
        component: RequireAuth(Dashboard),
    },
    {
        path: '/headquarters',
        title: 'My Vector',
        breadcrumb: 'My Vector',
        breadcrumb_link: true,
        exact: true,
        component: RequireAuth(Headquarters),
    },
    {
        path: '/my-team',
        title: 'My Team',
        breadcrumb: 'My Team',
        breadcrumb_link: true,
        exact: true,
        component: RequireAuth(Manager),
    },
    {
        path: '/contacts',
        title: 'Contacts Management',
        breadcrumb: 'Contacts',
        breadcrumb_link: true,
        exact: true,
        component: RequireAuth(Contacts)
    },
    {
        path: '/accounts',
        title: 'Accounts',
        breadcrumb: 'Account',
        breadcrumb_link: false,
        exact: true,
        component: RequireAuth(Accounts)
    },
    {
        path: '/opportunities',
        title: 'Opportunities',
        breadcrumb: 'Opportunity',
        breadcrumb_link: false,
        exact: true,
        component: RequireAuth(Opportunities)
    },
    {
        path: '/reports',
        title: 'Reports',
        breadcrumb: 'Reports',
        breadcrumb_link: true,
        exact: true,
        component: RequireAuth(Reports)
    },
    {
        path: '/reports/:id',
        title: 'Report',
        breadcrumb: 'Report',
        breadcrumb_link: false,
        exact: false,
        component: Report
    },
    {
        path: '/forms',
        title: 'Forms',
        breadcrumb: 'Forms',
        breadcrumb_link: false,
        exact: true,
        component: Forms
    },
    {
        path: '/icons',
        title: 'Icons',
        breadcrumb: 'Icons',
        breadcrumb_link: false,
        exact: true,
        component: Icons
    }
];
