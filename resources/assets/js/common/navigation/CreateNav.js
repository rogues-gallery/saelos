import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import * as MDIcons from "react-icons/lib/md";

const CreateNav = ({ user }, { i18n }) => (
  <div className="dropdown show float-right">
    <Link
      to={"/"}
      className="btn btn-primary dropdown-toggle"
      role="button"
      id="quickCreateMenu"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <MDIcons.MdAdd />
    </Link>
    <div className="dropdown-menu" aria-labelledby="quickCreateMenu">
      <Link to={"/contacts/new"} className="dropdown-item">
        {i18n.t("messages.create.contact")}
      </Link>
      <Link to={"/companies/new"} className="dropdown-item">
        {i18n.t("messages.create.company")}
      </Link>
      <Link to={"/opportunities/new"} className="dropdown-item">
        {i18n.t("messages.create.opportunity")}
      </Link>
    </div>
  </div>
);

CreateNav.propTypes = {
  user: PropTypes.object.isRequired
};

CreateNav.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default CreateNav;
