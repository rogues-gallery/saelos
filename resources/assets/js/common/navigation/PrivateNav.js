import React from "react";
import PropTypes from "prop-types";

import routes from "../../routes/routes";
import NavItem from "./NavItem";
import { _t } from "../../i18n";

const PrivateNav = ({ user }) => (
  <ul className="nav">
    {routes.map((route, i) => {
      if (typeof route.menu !== "object") {
        return;
      }

      const {
        linkText,
        icon: Icon,
        location,
        subLinks: SubLinks,
        roles
      } = route.menu;

      if (location === "main" && user.authorized(roles)) {
        return (
          <React.Fragment key={`route-nav-item-${i}-main`}>
            <NavItem path={route.path}>
              <i className="h5 mr-2">
                <Icon />
              </i>
              {_t(linkText)}
            </NavItem>
            {route.menu.subLinks ? <SubLinks /> : ""}
          </React.Fragment>
        );
      }
    })}
  </ul>
);

PrivateNav.propTypes = {
  user: PropTypes.object.isRequired
};

export default PrivateNav;
