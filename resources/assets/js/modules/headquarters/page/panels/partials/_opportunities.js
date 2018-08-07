import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";

class Opportunities extends React.Component {
  render() {
    const { quota, total } = this.props;
    const percent = _.floor(total / quota * 100);

    return (
      <div className="card">
        <div className="card-header" id="headingOpportunities">
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseOpportunities"
            aria-expanded="false"
            aria-controls="collapseOpportunities"
          >
            <MDIcons.MdKeyboardArrowDown /> Opportunities{" "}
            <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div
          id="collapseOpportunities"
          className="collapse mh-200"
          aria-labelledby="headingOpportunities"
        >
          <div className="card-body border-bottom">
            <span className="text-muted pb-2">
              <b>Feature Coming Soon</b>
            </span>
            <p className="text-muted">
              Your opportunity volume in this quarter is significantly under your
              quota levels. There are <b>23 contacts</b> assigned to you who
              have a status that may be ready to be updated.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Opportunities.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Opportunities;
