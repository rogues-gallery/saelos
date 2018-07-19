import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Company from "../../../Company";
import { getActiveUser } from "../../../../users/store/selectors";
import Details from "./components/Details";
import History from "./components/History";

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "default"
    };
  }

  _toggleView = view => {
    this.setState({ view: view });
  };

  render() {
    const { dispatch, company, user, inEdit } = this.props;

    if (company.id === null) {
      return "";
    }

    const data = { series: [[5, 4, 7, 3, 9]] };
    const options = {
      low: 0,
      fullWidth: true,
      showArea: true,
      showLabel: false,
      axisX: {
        showGrid: true,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      }
    };

    switch (this.state.view) {
      case "default":
        return (
          <Details
            company={company}
            dispatch={dispatch}
            toggle={this._toggleView}
            user={user}
            data={data}
            options={options}
            inEdit={inEdit}
          />
        );
      case "history":
        return (
          <History
            activities={company.activities}
            dispatch={dispatch}
            toggle={this._toggleView}
            inEdit={inEdit}
          />
        );
    }
  }
}

Detail.propTypes = {
  company: PropTypes.instanceOf(Company).isRequired,
  user: PropTypes.object.isRequired
};

export default connect(state => ({
  user: getActiveUser(state)
}))(Detail);
