import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const Link = ({ path, children, className = '' }) => (
  <li className="nav-item">
    <NavLink to={path} className={`nav-link ${className}`} activeClassName="active">
      {children}
    </NavLink>
  </li>
)

Link.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string
}

Link.contextTypes = {
  router: PropTypes.object,
}

export default Link
