import Contacts from './components/Pages/Contacts';
import Dashboard from './components/Pages/Dashboard';
import Headquarters from './components/Pages/Headquarters';
import Icons from './components/Pages/Icons';
import Forms from './components/Pages/Forms';
import RequireAuth from './components/Auth/RequireAuth';
import Accounts from "./components/Pages/Accounts";
import Opportunities from "./components/Pages/Opportunities";

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
