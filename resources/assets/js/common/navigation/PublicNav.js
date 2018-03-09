// import libs
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'reactstrap';

// import components
import NavItem from './NavItem'

const PublicNav = ({ showNavigation }) => (
  <Nav vertical>
    <NavItem path="/">Home</NavItem>
    <NavItem path="/headquarters">My Vector</NavItem>
    <NavItem path="/contacts">Contacts</NavItem>
    <NavItem path="/companies">Companies</NavItem>
    <NavItem path="/opportunities">Opportunities</NavItem>
    <NavItem path="/reports">Reports</NavItem>
  </Nav>
)

PublicNav.propTypes = {
  showNavigation: PropTypes.bool.isRequired,
};

export default PublicNav
