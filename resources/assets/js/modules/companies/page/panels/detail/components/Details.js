import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";

import Opportunities from "../../../../../opportunities/partials/_opportunities";
import Contacts from "../../../../../contacts/partials/_contacts";
import Notes from "../../../../../notes/partials/_notes";
import ActivityList from "./ActivityList";

const Details = (
  { company, dispatch, toggle, user, data, options, inEdit },
  { i18n }
) => (
  <div className={`col detail-panel border-left ${inEdit ? "inEdit" : ""}`}>
    <div className="border-bottom py-2 heading">
      <a
        href="javascript:void(0)"
        className="mt-1 btn btn-xs btn-outline-secondary position-fixed r-0 mr-2"
        onClick={() => toggle("history")}
      >
        <span className="h5">
          <MDIcons.MdKeyboardArrowRight />
        </span>
      </a>
      <div className="pt-1 mt-1 h5 text-center">
        {i18n.t("messages.company.details")}
      </div>
    </div>
    <div className="h-scroll">
      <ActivityList company={company} dispatch={dispatch} />
      <Contacts model={company} inEdit={inEdit} />
      <Opportunities model={company} inEdit={inEdit} />
      <Notes model={company} dispatch={dispatch} user={user} />
    </div>
  </div>
);

Details.propTypes = {
  company: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object,
  options: PropTypes.object,
  inEdit: PropTypes.bool
};

Details.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Details;
