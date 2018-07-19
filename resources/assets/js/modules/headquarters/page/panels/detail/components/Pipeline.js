import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import ChartistGraph from "react-chartist";
import _ from "lodash";

import { fetchContacts } from "../../../../../contacts/service";

const Pipeline = (
  { contacts, dispatch, toggle, user, statuses, router, count },
  { i18n }
) => {
  const contact_percent_difference =
    ((user.total_contacts - user.total_contacts_last_week) /
      user.total_contacts_last_week) *
    100;
  const percent = new Intl.NumberFormat(i18n.language, {
    maximumSignificantDigits: 2
  }).format(contact_percent_difference);

  const data = {
    labels: Object.keys(count).map(k => {
      let s = _.find(statuses, s => s.id === parseInt(k));

      return typeof s === "object" ? s.name : i18n.t("messages.unknown");
    }),
    series: [Object.keys(count).map(k => count[k])]
  };

  const options = {
    low: 0,
    fullWidth: true,
    showArea: true,
    axisX: {
      showGrid: false,
      showLabel: true,
      offset: 0
    },
    axisY: {
      showGrid: true,
      showLabel: false,
      offset: 0
    }
  };

  const openContactSearch = string => {
    dispatch(fetchContacts({ page: 1, searchString: string }));
    router.history.push("/contacts");
  };

  return (
    <div className="col detail-panel border-left">
      <div className="border-bottom py-2 heading">
        <a
          href="javascript:void(0)"
          className="mt-1 btn btn-xs btn-outline-secondary position-absolute ml-2"
          onClick={() => toggle("vector")}
        >
          <span className="h5">
            <MDIcons.MdKeyboardArrowLeft />
          </span>
        </a>
        <div className="pt-1 mt-1 h5 text-center">
          {i18n.t("messages.pipeline")}
        </div>
      </div>
      <div className="h-scroll ct-container">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">
              <MDIcons.MdKeyboardArrowDown /> {i18n.t("messages.my.contacts")}
            </h6>
          </div>

          <div className="card-body border-bottom">
            <div className="pipelineGraph">
              <div className="h1 text-center">{user.total_contacts}</div>
              <div className="text-center mini-text text-muted text-uppercase pb-2">
                {user.total_contacts > user.total_contacts_last_week ? (
                  <span className="text-success h5">
                    <MDIcons.MdArrowDropUp />
                  </span>
                ) : (
                  <span className="text-danger h5">
                    <MDIcons.MdArrowDropDown />
                  </span>
                )}
                <span className="text-dark">
                  {i18n.t("messages.percent.change", {
                    percent: percent,
                    timeframe: i18n.t("messages.time.week")
                  })}
                </span>
              </div>
              <ChartistGraph
                data={data}
                options={options}
                type="Bar"
                className="graph"
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingStatus">
            <h6
              className="mb-0"
              data-toggle="collapse"
              data-target="#collapseStatus"
              aria-expanded="false"
              aria-controls="collapseStatus"
            >
              <MDIcons.MdKeyboardArrowDown />{" "}
              {i18n.t("messages.current.status")}
            </h6>
          </div>

          <div
            id="collapseStatus"
            className="show collapse mh-200"
            aria-labelledby="headingStatus"
          >
            {statuses.map(s => {
              const thisCount = _.get(count, s.id, null);

              return (
                <div
                  key={`user-${user.id}-status-${s.id}`}
                  className="list-group"
                >
                  <div className="list-group-item list-group-item-action align-items-start">
                    <p
                      onClick={() =>
                        openContactSearch(`assignee:me status:"${s.name}"`)
                      }
                    >
                      <strong>
                        {s.name}{" "}
                        {thisCount ? (
                          <span className="text-muted">({thisCount})</span>
                        ) : (
                          ""
                        )}
                      </strong>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Pipeline.propTypes = {};

Pipeline.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Pipeline;
