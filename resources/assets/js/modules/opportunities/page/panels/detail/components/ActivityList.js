import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";

import ListActivities from "../../../../../activities/partials/_list";
import { openTaskContainer } from "../../../../../activities/store/actions";

const ActivityList = ({ opportunity, dispatch }, { i18n }) => {
  const _toggleAdd = () => {
    dispatch(openTaskContainer(opportunity, "task"));
  };

  const filtered = _.filter(
    opportunity.activities,
    a => a.details_type !== "App\\FieldUpdateActivity"
  );

  return (
    <div className="card ct-container">
      <div className="card-header" id="taskList">
        <a
          href="javascript:void(0);"
          className="float-right"
          onClick={_toggleAdd}
        >
          <strong>{i18n.t("messages.add")}</strong>
        </a>
        <h6
          className="mb-0"
          data-toggle="collapse"
          data-target="#collapseTasks"
          aria-expanded="true"
          aria-controls="collapseTasks"
        >
          <MDIcons.MdKeyboardArrowDown /> {i18n.t("messages.task_plural")}
          <span className="text-muted font-weight-normal">
            ({filtered.length})
          </span>
        </h6>
      </div>
      <div
        id="collapseTasks"
        className="collapse mh-200"
        aria-labelledby="taskList"
      >
        <div className="list-group">
          <ListActivities
            activities={filtered}
            dispatch={dispatch}
            view={"headquarters"}
          />
        </div>
      </div>
    </div>
  );
};

ActivityList.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ActivityList;
