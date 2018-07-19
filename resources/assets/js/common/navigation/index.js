// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../modules/auth/service";
import { Link } from "react-router-dom";
import PrivateNav from "./PrivateNav";
import ConfigNav from "./ConfigNav";
import CreateNav from "./CreateNav";
import CreateConfigNav from "./CreateConfigNav";

import { getAuth } from "../../modules/auth/store/selectors";
import { getActiveUser } from "../../modules/users/store/selectors";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavigation: false,
      showDropdown: false
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      showNavigation: !this.state.showNavigation
    });
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  logout(e) {
    e.preventDefault();

    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className={`col nav-panel bg-dark-grey`}>
        <div className="mx-2 mb-4 py-2 border-bottom heading">
          <div className="dropdown show float-left">
            <Link
              to={"/"}
              className="btn btn-dark dropdown-toggle"
              role="button"
              id="userMenu"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.user.name.match(/\b(\w)/g).join("")}
            </Link>
            <div className="dropdown-menu" aria-labelledby="userMenu">
              <Link to={"/user/profile"} className="dropdown-item">
                {this.context.i18n.t("messages.my.profile")}
              </Link>
              <Link to={"/notifications"} className="dropdown-item">
                {this.context.i18n.t("messages.notifications")}
              </Link>
              <Link to={"/config/settings"} className="dropdown-item">
                {this.context.i18n.t("messages.config")}
              </Link>
              <Link to={"/logout"} className="dropdown-item">
                {this.context.i18n.t("messages.logout")}
              </Link>
            </div>
          </div>

          {this.props.location.pathname.startsWith("/config") ? (
            <CreateConfigNav user={this.props.user} />
          ) : (
            <CreateNav user={this.props.user} />
          )}
        </div>
        <div className="h-scroll">
          {this.props.isAuthenticated ? (
            this.props.location.pathname.startsWith("/config") ? (
              <ConfigNav user={this.props.user} />
            ) : (
              <PrivateNav user={this.props.user} />
            )
          ) : (
            <PublicNav showNavigation={this.state.showNavigation} />
          )}
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

Navigation.contextTypes = {
  router: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

export default withRouter(
  connect(state => ({
    isAuthenticated: getAuth(state),
    user: getActiveUser(state)
  }))(Navigation)
);
