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
    <NavItem path="/contacts"><i className="h5 mr-2"><MDIcons.MdPersonOutline /></i> Contacts</NavItem>
    <NavItem path="/headquarters"><i className="h5 mr-2"><MDIcons.MdNetworkCheck /></i> My Vector</NavItem>
    <NavItem path="/accounts"><i className="h5 mr-2"><MDIcons.MdBusiness /></i> Accounts</NavItem>
    <NavItem path="/opportunities"><i className="h5 mr-2"><MDIcons.MdAttachMoney /></i> Opportunities</NavItem>
    <NavItem path="/reports"><i className="h5 mr-2"><MDIcons.MdInsertChart /></i> Reports</NavItem>
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
