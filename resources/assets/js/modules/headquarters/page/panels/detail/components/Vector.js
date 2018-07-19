import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import ChartistGraph from "react-chartist";
import _ from "lodash";

import Volume from "../../partials/_volume";
import Email from "../../partials/_email";
import Calls from "../../partials/_calls";
import Team from "../../partials/_team";
import Opportunities from "../../partials/_opportunities";
import Responses from "../../partials/_responses";
import { getCustomFieldValue } from "../../../../../../utils/helpers";

const Vector = ({ dispatch, toggle, user, count }, { i18n }) => {
  const data = {
    labels: ["V", "E", "C", "T", "O", "R"],
    series: [
      ["volume", "email", "calls", "team", "opportunities", "responses"].map(
        k => count[k]
      )
    ]
  };

  const options = {
    high: 10,
    low: 0,
    stackBars: true,
    fullWidth: true,
    showArea: true,
    // showLabel: true,
    axisX: {
      showGrid: false,
      showLabel: true
      // offset: 0
    },
    axisY: {
      showGrid: true,
      showLabel: false,
      offset: 0
    }
  };

  const emailQuota = parseInt(
    getCustomFieldValue("number_of_emails", user.custom_fields, 15)
  );
  const callQuota = parseInt(
    getCustomFieldValue("number_of_calls", user.custom_fields, 15)
  );
  const teamQuota = parseInt(
    getCustomFieldValue("number_of_sms", user.custom_fields, 15)
  );
  const oppQuota = parseInt(
    getCustomFieldValue("number_of_opportunities", user.custom_fields, 15)
  );
  const responseQuota = parseInt(
    getCustomFieldValue("number_of_responses", user.custom_fields, 15)
  );
  const volumeQuota = _.sum([
    emailQuota,
    callQuota,
    teamQuota,
    oppQuota,
    responseQuota
  ]);

  return (
    <div className="col detail-panel border-left">
      <div className="border-bottom py-2 heading">
        <a
          href="javascript:void(0)"
          className="mt-1 btn btn-xs btn-outline-secondary position-absolute r-0 mr-2"
          onClick={() => toggle("default")}
        >
          <span className="h5">
            <MDIcons.MdKeyboardArrowRight />
          </span>
        </a>
        <div className="pt-1 mt-1 h5 text-center">
          {i18n.t("messages.vector").toUpperCase()}
        </div>
      </div>
      <div className="h-scroll">
        <div className="card ct-container">
          <div className="card-header" id="headingVector">
            <h6
              className="mb-0"
              data-toggle="collapse"
              data-target="#headingVector"
              aria-expanded="true"
              aria-controls="collapseVector"
            >
              <MDIcons.MdKeyboardArrowDown /> {i18n.t("messages.summary")}
            </h6>
          </div>

          <div
            id="collapseVector"
            className="collapse show"
            aria-labelledby="headingVector"
          >
            <div className="card-body border-bottom">
              <VectorChart
                data={data}
                options={options}
                type="Bar"
                i18n={i18n}
              />
            </div>
          </div>
        </div>

        <Volume quota={volumeQuota} total={count.volume} />
        <Email quota={emailQuota} total={count.email} />
        <Calls quota={callQuota} total={count.calls} />
        <Team quota={teamQuota} total={count.team} />
        <Opportunities quota={oppQuota} total={count.opportunities} />
        <Responses quota={responseQuota} total={count.responses} />
      </div>
    </div>
  );
};

const VectorChart = ({ data, options, type, i18n }) => {
  return (
    <div className="vectorGraph">
      <div className="h1 text-center">74%</div>
      <div className="text-center mini-text text-muted text-uppercase pb-2">
        <span className="text-success h5">
          <MDIcons.MdArrowDropUp />
        </span>
        <span className="text-dark">
          {i18n.t("messages.percent.change", {
            percent: 23,
            timeframe: i18n.t("messages.time.week")
          })}
        </span>
      </div>
      <ChartistGraph
        data={data}
        options={options}
        type={type}
        className="vector-graph"
      />
    </div>
  );
};

Vector.propTypes = {};

Vector.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Vector;
