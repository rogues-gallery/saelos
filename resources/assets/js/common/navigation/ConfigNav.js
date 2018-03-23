// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as MDIcons from 'react-icons/lib/md'

// import components
import NavItem from './NavItem'

const ConfigNav = ({ showNavigation }) => (
  <ul className="nav">
    <NavItem path="/contacts">Back</NavItem>
    <NavItem path="/config/settings">Settings</NavItem>
    <NavItem path="/config/stages">Stages</NavItem>
    <NavItem path="/config/statuses">Statuses</NavItem>
    <NavItem path="/config/fields">Fields</NavItem>
    <NavItem path="/config/teams">Teams</NavItem>
    <NavItem path="/config/users">Users</NavItem>
  </ul>
)

ConfigNav.propTypes = {
  showNavigation: PropTypes.bool.isRequired,
};

export default ConfigNav
