import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";

class Calls extends React.Component {
  render() {
    const { quota, total } = this.props;
    const percent = _.floor(total / quota * 100);

    return (
      <div className="card">
        <div className="card-header" id="headingCalls">
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseCalls"
            aria-expanded="false"
            aria-controls="collapseCalls"
          >
            <MDIcons.MdKeyboardArrowDown /> Calls{" "}
            <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div
          id="collapseCalls"
          className="collapse mh-200"
          aria-labelledby="headingCalls"
        >
          <div className="card-body border-bottom">
            <span className="text-muted pb-2">
              <b>Feature Coming Soon</b>
            </span>
            <p className="text-muted">
              Your call volume in this quarter is significantly under your quota
              levels. There are <b>23 contacts</b> assigned to you who prefer
              phone calls or have a status that may be ready to be updated.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Calls.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Calls;
