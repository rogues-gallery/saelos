// import libs
import React from "react";
import PropTypes from "prop-types";

// import components
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import * as MDIcons from "react-icons/lib/md";

const CreateConfigNav = ({ user }, { i18n }) => (
  <div className="dropdown show float-right">
    <Link
      to={"/"}
      className="btn btn-primary dropdown-toggle"
      role="button"
      id="quickCreateConfigMenu"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <MDIcons.MdAdd />
    </Link>
    <div className="dropdown-menu" aria-labelledby="quickCreateConfigMenu">
      <Link to={"/config/fields/new"} className="dropdown-item">
        {i18n.t("messages.create.field")}
      </Link>
      <Link to={"/config/stages/new"} className="dropdown-item">
        {i18n.t("messages.create.stage")}
      </Link>
      <Link to={"/config/statuses/new"} className="dropdown-item">
        {i18n.t("messages.create.status")}
      </Link>
      <Link to={"/config/teams/new"} className="dropdown-item">
        {i18n.t("messages.create.team")}
      </Link>
      <Link to={"/config/users/new"} className="dropdown-item">
        {i18n.t("messages.create.user")}
      </Link>
    </div>
  </div>
);

CreateConfigNav.propTypes = {
  user: PropTypes.object.isRequired
};

CreateConfigNav.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default CreateConfigNav;
