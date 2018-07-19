import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ChartistGraph from "react-chartist";
import { NavLink } from "react-router-dom";
import * as MDIcons from "react-icons/lib/md";

const ContactStatusTimeline = (
  { contact, statuses, statusChange },
  { i18n }
) => {
  const ordered = _.orderBy(statuses, "ordering");

  const data = {
    series: [
      ordered.map(
        s =>
          parseInt(s.ordering) >= parseInt(contact.status.ordering) ? 1 : null
      ),
      ordered.map(
        s =>
          parseInt(s.ordering) > parseInt(contact.status.ordering) ? null : 1
      )
    ]
  };
  const options = {
    low: 0,
    high: 2,
    fullWidth: true,
    height: "50px",
    showArea: false,
    showLabel: false,
    axisX: {
      showGrid: false,
      showLabel: false,
      offset: 0
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    }
  };

  const firstNotCompleted = _.find(contact.activities, a => !a.completed);
  const link = firstNotCompleted ? (
    <NavLink to={`/headquarters/${firstNotCompleted.id}`}>
      {firstNotCompleted.name}
    </NavLink>
  ) : (
    "All caught up!"
  );
  const recentlyCompleted = _.find(
    _.orderBy(_.find(contact.activities, "completed"), "created_at"),
    a => a.details_type !== "App\\FieldUpdateActivity"
  );
  const lastTouch = recentlyCompleted
    ? recentlyCompleted.created_at
    : contact.updated_at;

  return (
    <div className="card ct-container-inverse">
      <div className="card-header" id="statusTimeline">
        <h6
          className="mb-0"
          data-toggle="collapse"
          data-target="#collapseTimeline"
          aria-expanded="true"
          aria-controls="collapseTimeline"
        >
          <MDIcons.MdKeyboardArrowDown /> {i18n.t("messages.status.snapshot")}
        </h6>
      </div>
      <div
        id="collapseTimeline"
        className="collapse show"
        aria-labelledby="statusTimeline"
      >
        <div className="card-body border-bottom">
          <div className="dropdown show">
            <div
              id="statusDropdown"
              data-toggle="dropdown"
              className="h1 text-center cursor-pointer dropdown"
            >
              {contact.status.name}
            </div>
            <div
              className="dropdown-menu absolute-centered"
              aria-labelledby="statusDropdown"
            >
              {statuses.map(status => (
                <a
                  key={`contact-${contact.id}-status-${status.id}`}
                  className="dropdown-item"
                  href="javascript:void(0)"
                  onClick={() => statusChange(status.id)}
                >
                  {status.name}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mini-text text-muted text-uppercase pb-2">
            <MDIcons.MdAccessTime /> {i18n.t("messages.last.touched")}
            <span className="text-dark">{moment(lastTouch).fromNow()}</span>
          </div>
          <ChartistGraph
            data={data}
            options={options}
            type="Line"
            className="status-timeline"
          />
          <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">
            {i18n.t("messages.next.task")}
          </div>
          <p>{link}</p>
        </div>
      </div>
    </div>
  );
};

ContactStatusTimeline.propTypes = {
  contact: PropTypes.object.isRequired,
  statuses: PropTypes.array.isRequired,
  statusChange: PropTypes.func.isRequired
};

ContactStatusTimeline.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ContactStatusTimeline;
