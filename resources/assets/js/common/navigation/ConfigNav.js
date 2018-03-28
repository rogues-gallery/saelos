// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import NavItem from './NavItem'
import routes from "../../routes/routes"
import PrivateNav from "./PrivateNav";

const ConfigNav = ({ user }) => (
  <ul className="nav">
    <NavItem path="/contacts">Back</NavItem>
    {routes.map((route, i) => {
      if (typeof route.menu !== 'object') {
        return
      }

      const { linkText, icon: Icon, location, subLinks, roles } = route.menu

      if (location === 'config' && user.authorized(roles)) {
        return (
          <NavItem key={`route-nav-item-${i}-config`} path={route.path}>
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

ConfigNav.propTypes = {
  user: PropTypes.object.isRequired
}

export default ConfigNav
