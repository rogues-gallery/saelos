import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import ChartistGraph from "react-chartist";
import { Money } from "react-format";
import moment from "moment";
import _ from "lodash";

import Contacts from "../../../../../contacts/partials/_contacts";
import Companies from "../../../../../companies/partials/_companies";
import Notes from "../../../../../notes/partials/_notes";
import { saveOpportunity } from "../../../../service";
import ActivityList from "./ActivityList";

const Details = (
  { opportunity, dispatch, toggle, user, data, options, inEdit, stages },
  { i18n }
) => {
  const orderedStageActivities = _.orderBy(
    _.filter(
      opportunity.activities,
      a =>
        a.details_type === "App\\FieldUpdateActivity" &&
        a.name.startsWith("Stage changed")
    ),
    "created_at",
    "desc"
  );

  const lastStageChange = orderedStageActivities[0];

  return (
    <div className={`col detail-panel border-left`}>
      <div className="border-bottom py-2 heading">
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
          {i18n.t("messages.generic.details", {
            name: i18n.t("messages.opportunity")
          })}
        </div>
      </div>
      <div className="h-scroll">
        <div className="card ct-container-inverse">
          <div className="card-header" id="headingOutcome">
            <h6
              className="mb-0"
              data-toggle="collapse"
              data-target="#collapseOutcome"
              aria-expanded="true"
              aria-controls="collapseOutcome"
            >
              <MDIcons.MdKeyboardArrowDown />{" "}
              {i18n.t("messages.generic.outcome", {
                name: i18n.t("messages.opportunity")
              })}
            </h6>
          </div>

          <div
            id="collapseOutcome"
            className="collapse show"
            aria-labelledby="headingOutcome"
          >
            <div className="card-body border-bottom">
              <div className="h1 text-center">
                <Money>{opportunity.amount}</Money>
              </div>
              {lastStageChange ? (
                <div className="text-center mini-text text-muted text-uppercase pb-2">
                  <MDIcons.MdAccessTime />{" "}
                  {i18n.t("messages.generic.changed", {
                    name: i18n.t("messages.stage")
                  })}
                  <span className="text-dark">
                    {moment(lastStageChange.created_at).fromNow()}
                  </span>
                </div>
              ) : null}
              <ChartistGraph data={data} options={options} type="Line" />
              <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">
                {i18n.t("messages.stage")}
              </div>
              <div className="dropdown show">
                <div
                  className="cursor-pointer"
                  id="stageDropdown"
                  data-toggle="dropdown"
                >
                  <b>{opportunity.stage.name || "No stage set"}</b>
                </div>
                <div className="dropdown-menu" aria-labelledby="stageDropdown">
                  {stages.map(stage => (
                    <a
                      key={stage.id}
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={() => {
                        const model = opportunity.originalProps;

                        _.remove(model, "stage");
                        _.set(model, "stage_id", stage.id);

                        dispatch(saveOpportunity(model));
                      }}
                    >
                      {stage.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActivityList opportunity={opportunity} dispatch={dispatch} />
        <Contacts model={opportunity} inEdit={inEdit} />
        <Companies model={opportunity} inEdit={inEdit} />
        <Notes model={opportunity} user={user} />
      </div>
    </div>
  );
};

Details.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Details;
