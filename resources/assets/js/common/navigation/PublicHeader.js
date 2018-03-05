// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import { Collapse } from 'reactstrap'
import NavItem from './NavItem'

// initiate comppnent
const PublicHeader = ({ showNavigation }) => (
  <Collapse className="navbar-collapse navbar-dark" isOpen={showNavigation}>
    <ul className="navbar-nav mr-auto">
      <NavItem path="/">Home</NavItem>
    </ul>
    <ul className="navbar-nav">
      <NavItem path="/login">Login</NavItem>
      <NavItem path="/register">Register</NavItem>
    </ul>
  </Collapse>
)

PublicHeader.propTypes = {
  showNavigation: PropTypes.bool.isRequired,
};

// export component
export default PublicHeader
