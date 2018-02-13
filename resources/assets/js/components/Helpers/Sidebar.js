import React from 'react';
import Navigation from './Navigation';
import SidebarTitle from './SidebarTitle';

const Sidebar = () => (
    <div className="sidebar">
        <SidebarTitle/>

        <Navigation/>
    </div>
);

export default Sidebar;