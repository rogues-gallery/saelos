import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import Opportunity from "../../../Opportunity";
import { isInEdit } from "../../../store/selectors";
import { getActiveUser } from "../../../../users/store/selectors";
import { getStages } from "../../../../stages/store/selectors";
import Details from "./components/Details";
import History from "./components/History";

class Detail extends Component {
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
    const { opportunity, dispatch, user, inEdit, stages } = this.props;
    const ordered = _.orderBy(stages, "probability");

    const data = {
      series: [
        ordered.map(
          s =>
            parseInt(s.probability) >= parseInt(opportunity.stage.probability)
              ? 1
              : null
        ),
        ordered.map(
          s =>
            parseInt(s.probability) > parseInt(opportunity.stage.probability)
              ? null
              : 1
        )
      ]
    };

    const options = {
      low: 0,
      high: 2,
      fullWidth: true,
      height: "50px",
      showArea: false,
      showLabel: false,
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      }
    };

    if (opportunity.id === null) {
      return "";
    }

    switch (this.state.view) {
      case "default":
        return (
          <Details
            opportunity={opportunity}
            dispatch={dispatch}
            toggle={this._toggleView}
            user={user}
            data={data}
            options={options}
            inEdit={inEdit}
            stages={ordered}
          />
        );
      case "history":
        return (
          <History
            activities={opportunity.activities}
            dispatch={dispatch}
            toggle={this._toggleView}
            inEdit={inEdit}
          />
        );
    }
  }
}

Detail.propTypes = {
  opportunity: PropTypes.instanceOf(Opportunity).isRequired,
  user: PropTypes.object.isRequired,
  stages: PropTypes.array.isRequired
};

export default connect(state => ({
  user: getActiveUser(state),
  inEdit: isInEdit(state),
  stages: getStages(state)
}))(Detail);
