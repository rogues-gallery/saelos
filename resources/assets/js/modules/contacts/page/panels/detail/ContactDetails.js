import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";

import ContactStatusTimeline from "./ContactStatusTimeline";
import ContactActivityList from "./ContactActivityList";
import Opportunities from "../../../../opportunities/partials/_opportunities";
import Companies from "../../../../companies/partials/_companies";
import Notes from "../../../../notes/partials/_notes";

const ContactDetails = (
  { contact, dispatch, toggle, user, inEdit, statuses, statusChange },
  { i18n }
) => (
  <div className={`col detail-panel border-left`}>
    <div className="border-bottom  py-2 heading">
      <a
        href="javascript:void(0)"
        className="mt-1 btn btn-xs btn-outline-secondary position-absolute r-0 mr-2"
        onClick={() => toggle("history")}
      >
        <span className="h5">
          <MDIcons.MdKeyboardArrowRight />
        </span>
      </a>
      <div className="pt-1 mt-1 h5 text-center">
        {i18n.t("messages.contact.details")}
      </div>
    </div>
    <div className="h-scroll">
      <ContactStatusTimeline
        contact={contact}
        statuses={statuses}
        statusChange={statusChange}
      />
      <ContactActivityList contact={contact} dispatch={dispatch} />
      <Opportunities model={contact} inEdit={inEdit} />
      <Companies model={contact} inEdit={inEdit} />
      <Notes model={contact} dispatch={dispatch} user={user} />
    </div>
  </div>
);

ContactDetails.propTypes = {
  contact: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  inEdit: PropTypes.bool.isRequired,
  statuses: PropTypes.array.isRequired,
  statusChange: PropTypes.func.isRequired
};

ContactDetails.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ContactDetails;
