import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import moment from "moment";

const History = ({ activities, dispatch, toggle, inEdit }, { i18n }) => (
  <div className={`col detail-panel border-left ${inEdit ? "inEdit" : ""}`}>
    <div className="border-bottom py-2 heading">
      <a
        href="javascript:void(0)"
        className="mt-1 btn btn-xs btn-outline-secondary position-absolute ml-2"
        onClick={() => toggle("default")}
      >
        <span className="h5">
          <MDIcons.MdKeyboardArrowLeft />
        </span>
      </a>
      <div className="pt-1 mt-1 h5 text-center">
        {i18n.t("messages.history")}
      </div>
    </div>
    <div className="h-scroll history">
      {activities.map(activity => (
        <div
          className="list-group-item"
          key={`activity-history-${activity.id}`}
        >
          <span className="text-muted float-right mini-text">
            {moment(activity.created_at).fromNow()}
          </span>
          <div className="activity">
            <b>{activity.name}</b>
          </div>
          <div dangerouslySetInnerHTML={{ __html: activity.description }} />
        </div>
      ))}
    </div>
  </div>
);

History.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default History;
