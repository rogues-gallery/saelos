import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavItem } from 'reactstrap'


const Link = ({ path, children }) => (
  <NavItem>
    <NavLink exact to={path} className="nav-link">
      {children}
    </NavLink>
  </NavItem>
)

Link.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.any,
}

Link.contextTypes = {
    router: PropTypes.object,
}

export default Link
