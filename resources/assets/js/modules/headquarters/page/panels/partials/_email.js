import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";

class Email extends React.Component {
  render() {
    const { quota, total } = this.props;
    const percent = _.floor(total / quota * 100);

    return (
      <div className="card">
        <div className="card-header" id="headingEmail">
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseEmail"
            aria-expanded="false"
            aria-controls="collapseEmail"
          >
            <MDIcons.MdKeyboardArrowDown /> Email{" "}
            <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div
          id="collapseEmail"
          className="collapse mh-200"
          aria-labelledby="headingEmail"
        >
          <div className="card-body border-bottom">
            <span className="text-muted pb-2">
              <b>Feature Coming Soon</b>
            </span>
            <p className="text-muted">
              Your email volume in this quarter is significantly under your
              quota levels. There are <b>23 contacts</b> assigned to you who
              prefer emails or have a status that may be ready to be updated.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Email.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Email;
