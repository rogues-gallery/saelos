import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getStatuses } from "../../../../statuses/store/selectors";
import { getActiveUser } from "../../../../users/store/selectors";
import { fetchStatuses } from "../../../../statuses/service";
import { fetchContactCount } from "../../../../contacts/service";
import { fetchQuotaCount } from "../../../../users/service";
import { fetchUser } from "../../../../auth/service";
import Pipeline from "./components/Pipeline";
import Vector from "./components/Vector";

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "default",
      contactCount: [],
      quotaCount: []
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
    this.props.dispatch(fetchStatuses());
  }

  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(fetchContactCount(user.id)).then(res => {
      this.setState({
        contactCount: res.data
      });
    });

    dispatch(fetchQuotaCount(user.id)).then(res => {
      this.setState({
        quotaCount: res.data
      });
    });
  }

  _toggleView = view => {
    this.setState({ view });
  };

  render() {
    const { dispatch, statuses, user } = this.props;
    const { contactCount, quotaCount } = this.state;
    const contacts = {};

    switch (this.state.view) {
      case "default":
        return (
          <Pipeline
            contacts={contacts}
            dispatch={dispatch}
            toggle={this._toggleView}
            user={user}
            router={this.context.router}
            statuses={statuses}
            count={contactCount}
          />
        );
      case "vector":
        return (
          <Vector
            dispatch={dispatch}
            toggle={this._toggleView}
            user={user}
            count={quotaCount}
          />
        );
    }
  }
}

Detail.propTypes = {
  user: PropTypes.object.isRequired,
  statuses: PropTypes.array.isRequired
};

Detail.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    user: getActiveUser(state),
    statuses: getStatuses(state)
  }))(Detail)
);
