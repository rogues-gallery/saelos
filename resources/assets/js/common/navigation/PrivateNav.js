// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap';

// import components
import NavItem from './NavItem'

const PrivateNav = ({ user, showNavigation, showDropdown, toggleDropdown, logout }) => (
  <Nav vertical pills>
    <NavItem path="/">Home</NavItem>
    <NavItem path="/headquarters">My Vector</NavItem>
    <NavItem path="/contacts">Contacts</NavItem>
    <NavItem path="/accounts">Accounts</NavItem>
    <NavItem path="/opportunities">Opportunities</NavItem>
    <NavItem path="/reports">Reports</NavItem>
  </Nav>
)

PrivateNav.propTypes = {
  user: PropTypes.object.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}


export default PrivateNav
