// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap';
import * as MDIcons from 'react-icons/lib/md'

// import components
import NavItem from './NavItem'

const PrivateNav = ({ user, showNavigation, showDropdown, toggleDropdown, logout }) => (
  <div className="nav">
    <NavItem path="/contacts"><MDIcons.MdPersonOutline /> Contacts</NavItem>
    <NavItem path="/headquarters"><MDIcons.MdNetworkCheck /> My Vector</NavItem>
    <NavItem path="/accounts"><MDIcons.MdBusiness /> Accounts</NavItem>
    <NavItem path="/opportunities"><MDIcons.MdAttachMoney /> Opportunities</NavItem>
    <NavItem path="/reports"><MDIcons.MdInsertChart /> Reports</NavItem>
  </div>
)

PrivateNav.propTypes = {
  user: PropTypes.object.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}


export default PrivateNav
