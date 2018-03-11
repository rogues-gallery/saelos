// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'reactstrap';

import * as MDIcons from 'react-icons/lib/md'

// import components
import NavItem from './NavItem'

const PrivateNav = ({ user, showNavigation, showDropdown, toggleDropdown, logout }) => (
  <ul className="nav">
    <NavItem path="/contacts"><i className="h5 mr-2"><MDIcons.MdPersonOutline /></i> Contacts</NavItem>
    <NavItem path="/headquarters"><i className="h5 mr-2"><MDIcons.MdNetworkCheck /></i> My Vector</NavItem>
    <NavItem path="/companies"><i className="h5 mr-2"><MDIcons.MdBusiness /></i> Companies</NavItem>
    <NavItem path="/opportunities"><i className="h5 mr-2"><MDIcons.MdAttachMoney /></i> Opportunities</NavItem>
    <NavItem path="/reports"><i className="h5 mr-2"><MDIcons.MdInsertChart /></i> Reports</NavItem>
  </ul>
)

PrivateNav.propTypes = {
  user: PropTypes.object.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}


export default PrivateNav
