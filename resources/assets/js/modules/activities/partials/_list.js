import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { fetchActivity } from "../service";

class ListActivities extends React.Component {
  constructor(props) {
    super(props);

    this.openActivityRecord = this.openActivityRecord.bind(this);
  }

  openActivityRecord(id) {
    this.props.dispatch(fetchActivity(id));
    this.context.router.history.push(`/headquarters/${id}`);
  }

  render() {
    const { activities, match } = this.props;
    return activities.map(activity => {
      // @TODO: Check fulfillment_date in some capacity
      const dateInstance = moment(activity.due_date ? activity.due_date : null);

      return (
        <div
          key={activity.id}
          onClick={() => this.openActivityRecord(activity.id)}
          className={`list-group-item list-group-item-action align-items-start ${
            activity.id == match.params.id ? "active" : ""
          }`}
        >
          <span
            className={`mini-text ${
              dateInstance.isBefore(moment()) ? "text-danger" : "text-muted"
            } float-right`}
          >
            <b>{dateInstance.fromNow()}</b>
          </span>
          <h6>{activity.name}</h6>
        </div>
      );
    });
  }
}

ListActivities.propTypes = {
  activities: PropTypes.array.isRequired
};

ListActivities.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(connect()(ListActivities));
