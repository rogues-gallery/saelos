// import libs
import React from 'react'
import PropTypes from 'prop-types'

import routes from '../../routes/routes'
import NavItem from './NavItem'

const PrivateNav = ({ user }) => (
  <ul className="nav">
    {routes.map((route, i) => {
      if (typeof route.menu !== 'object') {
        return
      }

      const { linkText, icon: Icon, location, subLinks, roles } = route.menu

      if (location === 'main' && user.authorized(roles)) {
        return (
          <NavItem key={`route-nav-item-${i}-main`} path={route.path}>
            <i className="h5 mr-2">
              <Icon />
            </i>
            {linkText}
          </NavItem>
        )
      }
    })}
  </ul>
)

PrivateNav.propTypes = {
  user: PropTypes.object.isRequired
}

export default PrivateNav
