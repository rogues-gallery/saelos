// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap';
import * as MDIcons from 'react-icons/lib/md'

// import components
import NavItem from './NavItem'

const ConfigNav = ({ showNavigation }) => (
  <Nav vertical>
    <NavItem path="/config">Settings</NavItem>
  </Nav>
)

ConfigNav.propTypes = {
  showNavigation: PropTypes.bool.isRequired,
};

export default ConfigNav
