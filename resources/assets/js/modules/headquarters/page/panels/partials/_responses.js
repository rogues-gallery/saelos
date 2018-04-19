import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";

class Responses extends React.Component {
  render() {
    const { quota, total } = this.props;
    const percent = _.floor(total / quota * 100);

    return (
      <div className="card">
        <div className="card-header" id="headingResponses">
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseResponses"
            aria-expanded="false"
            aria-controls="collapseResponses"
          >
            <MDIcons.MdKeyboardArrowDown /> Responses{" "}
            <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div
          id="collapseResponses"
          className="collapse mh-200"
          aria-labelledby="headingResponses"
        >
          <div className="card-body border-bottom">
            <span className="text-muted pb-2">
              <b>Feature Coming Soon</b>
            </span>
            <p className="text-muted">
              Your responses in this quarter is significantly under your quota
              levels. There are <b>23 contacts</b> assigned to you who have not
              responded.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Responses.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Responses;
