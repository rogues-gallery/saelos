import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const Link = ({ path, children }) => (
  <li className="nav-item">
    <NavLink to={path} className="nav-link">
      {children}
    </NavLink>
  </li>
)

Link.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.any,
}

Link.contextTypes = {
  router: PropTypes.object,
}

export default Link
